package com.example.portofolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;

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

    public DashboardController(ProfilService profilService, KontakService kontakService, PendidikanRepository pendidikanRepository, KeahlianService keahlianService, ProjectService projectService){
        this.profilService = profilService;
        this.kontakService = kontakService;
        this.pendidikanRepository = pendidikanRepository;
        this.keahlianService = keahlianService;
        this.projectService = projectService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("profil", profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada")));
        model.addAttribute("kontak", kontakService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Kontak tidak ada")));
        model.addAttribute("pendidikan", pendidikanRepository.findAllByOrderByTahunMulaiAsc());
        model.addAttribute("keahlian", keahlianService.semuaKeahlian());
        model.addAttribute("projects", projectService.semuaProject());
        return "dashboard";
    }
}
