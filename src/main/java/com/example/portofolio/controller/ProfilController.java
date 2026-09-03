package com.example.portofolio.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.portofolio.model.Profil;
import com.example.portofolio.service.ProfilService;


@Controller
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    public ProfilController(ProfilService profilService){
        this.profilService = profilService;
    }

    @GetMapping("/dashboard/editTentang")
    public String editTentang(Model model) {
        Profil profil = profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        model.addAttribute("profil", profil);
        return "editTentang";
    }

    @PostMapping("/dashboard/editTentang")
    public String updateProfil(@ModelAttribute Profil profil, @RequestParam(value = "fileFoto", required = false) MultipartFile fileFoto, @RequestParam(value = "fileCv", required = false) MultipartFile fileCv
    ) throws IOException {

        Profil dataLama = profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        if (fileFoto != null && !fileFoto.isEmpty()) {
            profil.setFoto(simpanFoto(fileFoto));
        } else {
            profil.setFoto(dataLama.getFoto());
        }

        if (fileCv != null && !fileCv.isEmpty()) {
            profil.setCv(simpanFoto(fileCv));
        } else {
            profil.setCv(dataLama.getCv());
        }
        profilService.updateProfil(1L, profil);
        return "redirect:/dashboard/editTentang";
    }

   public String simpanFoto(MultipartFile file) throws IOException {
    String nama = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path folder = Paths.get("src/main/resources/static/images/");
    Files.copy(file.getInputStream(), folder.resolve(nama), StandardCopyOption.REPLACE_EXISTING);
    return nama;
    }
}