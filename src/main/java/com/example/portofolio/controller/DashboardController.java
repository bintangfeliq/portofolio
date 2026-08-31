package com.example.portofolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.portofolio.model.Kontak;
import com.example.portofolio.model.Profil;
import com.example.portofolio.repository.PendidikanRepository;
import com.example.portofolio.service.KeahlianService;
import com.example.portofolio.service.KontakService;
import com.example.portofolio.service.ProfilService;
import com.example.portofolio.service.ProjectService;

@Controller
public class DashboardController {

    @Autowired
    private ProfilService profilService;
    @Autowired
    private KontakService kontakService;
    @Autowired
    private PendidikanRepository pendidikanRepository;
    @Autowired
    private KeahlianService keahlianService;
    @Autowired
    private ProjectService projectService;

    public DashboardController(ProfilService profilService, KontakService kontakService,
                        PendidikanRepository pendidikanRepository, KeahlianService keahlianService,
                        ProjectService projectService) {
        this.profilService = profilService;
        this.kontakService = kontakService;
        this.pendidikanRepository = pendidikanRepository;
        this.keahlianService = keahlianService;
        this.projectService = projectService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        Profil profil = profilService.cariSesuaiId(1L).orElseGet(() -> {
            Profil p = new Profil();
            p.setNama("Bintang");
            p.setDeskripsi("Siswa SMK Assalaam Bandung - RPL");
            p.setTentangSaya("Saya adalah siswa di SMK Assalaam Bandung dengan Jurusan Rekayasa Perangkat Lunak (RPL).");
            p.setFoto("profil.jpg");
            p.setAlamat("Bandung, Indonesia");
            return p;
        });

        Kontak kontak = kontakService.cariSesuaiId(1L).orElseGet(() -> {
            Kontak k = new Kontak();
            k.setEmail("email@gmail.com");
            k.setTelepon("08xxxxxxxxxx");
            k.setGithub("https://github.com");
            k.setInstagram("https://instagram.com");
            return k;
        });

        model.addAttribute("profil", profil);
        model.addAttribute("kontak", kontak);
        model.addAttribute("pendidikan", pendidikanRepository.findAllByOrderByTahunMulaiAsc());
        model.addAttribute("keahlian", keahlianService.semuaKeahlian());
        model.addAttribute("projects", projectService.semuaProject());
        return "dashboard";
    }
}
