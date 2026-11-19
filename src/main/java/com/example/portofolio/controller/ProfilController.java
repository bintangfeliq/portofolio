package com.example.portofolio.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.portofolio.model.Profil;
import com.example.portofolio.service.ProfilService;
import com.example.portofolio.util.UploadHelper;

@Controller
public class ProfilController {

    private final ProfilService profilService;
    private final UploadHelper uploadHelper;

    public ProfilController(ProfilService profilService, UploadHelper uploadHelper) {
        this.profilService = profilService;
        this.uploadHelper = uploadHelper;
    }

    @GetMapping("/dashboard/editTentang")
    public String editTentang(Model model) {
        Profil profil = profilService.cariSesuaiId(1L).orElseGet(Profil::new);
        model.addAttribute("profil", profil);
        return "editTentang";
    }

    @PostMapping("/dashboard/editTentang")
    public String updateProfil(@ModelAttribute Profil profil,
                               @RequestParam(value = "fileFoto", required = false) MultipartFile fileFoto,
                               @RequestParam(value = "fileCv", required = false) MultipartFile fileCv) throws IOException {
        Profil dataLama = profilService.cariSesuaiId(1L).orElseGet(Profil::new);
        if (fileFoto != null && !fileFoto.isEmpty()) {
            String fotoBaru = uploadHelper.saveFile(fileFoto, UploadHelper.IMAGE_EXTENSIONS, false);
            profil.setFoto(fotoBaru);
            uploadHelper.deleteFileQuietly(dataLama.getFoto());
        } else {
            profil.setFoto(dataLama.getFoto());
        }

        if (fileCv != null && !fileCv.isEmpty()) {
            String cvBaru = uploadHelper.saveFile(fileCv, UploadHelper.CV_EXTENSIONS, false);
            profil.setCv(cvBaru);
            uploadHelper.deleteFileQuietly(dataLama.getCv());
        } else {
            profil.setCv(dataLama.getCv());
        }
        profilService.updateProfil(1L, profil);
        return "redirect:/dashboard/editTentang";
    }
}
