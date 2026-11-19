package com.example.portofolio.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Global exception handler for friendly upload and validation error redirects.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public String handleMaxUploadSize(MaxUploadSizeExceededException ex,
                                      HttpServletRequest request,
                                      RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("errorMessage",
                "Ukuran file terlalu besar. Maksimal 10 MB per file atau 50 MB total.");
        return "redirect:" + resolveSafeRedirectTarget(request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public String handleIllegalArgument(IllegalArgumentException ex,
                                        HttpServletRequest request,
                                        RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("errorMessage", ex.getMessage());
        return "redirect:" + resolveSafeRedirectTarget(request);
    }

    private String resolveSafeRedirectTarget(HttpServletRequest request) {
        String referer = request.getHeader("Referer");
        if (referer != null && !referer.isBlank()) {
            try {
                java.net.URI uri = java.net.URI.create(referer);
                String path = uri.getPath();
                if (path != null && path.startsWith("/")) {
                    return path;
                }
            } catch (IllegalArgumentException ignored) {
                // Fall back to dashboard
            }
        }
        return "/dashboard";
    }
}
