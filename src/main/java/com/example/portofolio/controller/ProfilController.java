package com.example.portofolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.portofolio.model.Profil;
import com.example.portofolio.service.ProfilService;

@Controller
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    ProfilController(ProfilService profilService) {
        this.profilService = profilService;
    }

    @GetMapping({"/dashboard/editTentang", "/dashboard/editProfil"})
    public String editTentang(Model model) {
        Profil profil = profilService.cariSesuaiId(1L).orElseGet(() -> {
            Profil p = new Profil();
            p.setNama("Bintang");
            p.setDeskripsi("Saya adalah siswa di SMK Assalaam Bandung dengan Jurusan Rekayasa Perangkat Lunak (RPL).");
            p.setTentangSaya("Saya adalah siswa di SMK Assalaam Bandung dengan Jurusan Rekayasa Perangkat Lunak (RPL). Saya sangat tertarik dengan teknologi dan informatika.\n\nSaya memiliki semangat tinggi untuk terus belajar dan mengembangkan skill yang saya miliki. Saya juga senang bekerja dalam tim dan mencoba berbagai hal baru di bidang teknologi.\n\nDi luar kegiatan belajar, saya memiliki beberapa hobi seperti berolahraga dan travelling. Bagi saya, olahraga membuat tubuh tetap bugar, sedangkan travelling memberikan pengalaman dan cerita baru.");
            p.setFoto("profil.jpg");
            p.setAlamat("Bandung, Indonesia");
            return p;
        });
        model.addAttribute("profil", profil);
        return "editTentang";
    }

    @PostMapping("/dashboard/editTentang")
    public String updateProfil(@ModelAttribute Profil profil, RedirectAttributes redirectAttributes) {
        if (profilService.cariSesuaiId(1L).isPresent()) {
            profilService.updateProfil(1L, profil);
        } else {
            profilService.tambahProfil(profil);
        }
        redirectAttributes.addFlashAttribute("pesanSukses", "Data profil & Tentang Saya berhasil diperbarui!");
        return "redirect:/dashboard/editTentang";
    }
}
