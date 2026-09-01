package com.example.portofolio.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.portofolio.model.Profil;
import com.example.portofolio.service.ProfilService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ProfilController {

    private final ProfilService profilService;

    @GetMapping("/dashboard/editTentang")
    public String editTentang(Model model) {
        Profil profil = profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        model.addAttribute("profil", profil);
        return "editTentang";
    }

    @PostMapping("/dashboard/editTentang")
    public String updateProfil(
            @ModelAttribute Profil profil,
            @RequestParam(value = "fileFoto", required = false) MultipartFile fileFoto,
            @RequestParam(value = "fileCv", required = false) MultipartFile fileCv,
            RedirectAttributes redirectAttributes
    ) throws IOException {

        Profil dataLama = profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        if (fileFoto != null && !fileFoto.isEmpty()) {
            profil.setFoto(simpanBerkas(fileFoto));
        } else {
            profil.setFoto(dataLama.getFoto());
        }

        if (fileCv != null && !fileCv.isEmpty()) {
            profil.setCv(simpanBerkas(fileCv));
        } else {
            profil.setCv(dataLama.getCv());
        }
        profilService.updateProfil(1L, profil);
        redirectAttributes.addFlashAttribute("pesanSukses", "Data profil & Tentang Saya berhasil diperbarui!");
        return "redirect:/dashboard/editTentang";
    }

    private String simpanBerkas(MultipartFile file) throws IOException {

        String nama = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path dirSrc = Paths.get("src/main/resources/static/images/");
        Path dirTarget = Paths.get("target/classes/static/images/");
        if (!Files.exists(dirSrc)) {
            Files.createDirectories(dirSrc);
        }
        Files.copy(
                file.getInputStream(),
                dirSrc.resolve(nama),
                StandardCopyOption.REPLACE_EXISTING
        );

        if (Files.exists(dirTarget)) {
            Files.copy(
                    file.getInputStream(),
                    dirTarget.resolve(nama),
                    StandardCopyOption.REPLACE_EXISTING
            );
        }
        return nama;
    }
}