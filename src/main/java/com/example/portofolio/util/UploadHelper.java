package com.example.portofolio.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * Shared helper for safe upload path resolution, filename sanitization,
 * extension validation, and physical file cleanup.
 */
@Component
public class UploadHelper {

    public static final Set<String> IMAGE_EXTENSIONS = Set.of("png", "jpg", "jpeg", "webp", "gif");
    public static final Set<String> CV_EXTENSIONS = Set.of("pdf", "doc", "docx", "png", "jpg", "jpeg", "webp");

    @Value("${app.upload.dir:uploads/}")
    private String uploadDir;

    public Path getUploadRoot() {
        return Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String saveFile(MultipartFile file, Set<String> allowedExtensions, boolean withUuidPrefix) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String originalFilename = file.getOriginalFilename();
        String baseName = (originalFilename != null && !originalFilename.isBlank())
                ? Paths.get(originalFilename).getFileName().toString()
                : "file.png";

        String sanitized = sanitizeFilename(baseName);
        String ext = getExtension(sanitized);
        if (ext.isEmpty() || !allowedExtensions.contains(ext)) {
            throw new IllegalArgumentException("Format file tidak didukung: ." + (ext.isEmpty() ? "unknown" : ext));
        }

        Path targetDir = getUploadRoot();
        if (!Files.exists(targetDir)) {
            Files.createDirectories(targetDir);
        }

        String prefix = withUuidPrefix
                ? System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8) + "_"
                : System.currentTimeMillis() + "_";
        String storedName = prefix + sanitized;

        Path destination = targetDir.resolve(storedName).normalize();
        if (!destination.startsWith(targetDir)) {
            throw new IllegalArgumentException("Nama file tidak valid");
        }

        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return storedName;
    }

    public void deleteFileQuietly(String filename) {
        if (filename == null || filename.isBlank()) {
            return;
        }
        try {
            Path root = getUploadRoot();
            Path target = root.resolve(Paths.get(filename).getFileName().toString()).normalize();
            if (target.startsWith(root)) {
                Files.deleteIfExists(target);
            }
        } catch (IOException ignored) {
            // Do not fail database delete if physical file was already removed or inaccessible
        }
    }

    private String sanitizeFilename(String filename) {
        String cleaned = filename.replaceAll("[^a-zA-Z0-9._-]", "_").replaceAll("_+", "_");
        if (cleaned.length() > 120) {
            String ext = getExtension(cleaned);
            String stem = cleaned.substring(0, Math.min(cleaned.length(), 100));
            cleaned = ext.isEmpty() ? stem : stem + "." + ext;
        }
        return cleaned;
    }

    private String getExtension(String filename) {
        int dot = filename.lastIndexOf('.');
        if (dot < 0 || dot == filename.length() - 1) {
            return "";
        }
        return filename.substring(dot + 1).toLowerCase(Locale.ROOT);
    }
}
