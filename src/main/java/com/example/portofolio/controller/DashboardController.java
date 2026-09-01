package com.example.portofolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.portofolio.repository.PendidikanRepository;
import com.example.portofolio.service.KeahlianService;
import com.example.portofolio.service.KontakService;
import com.example.portofolio.service.ProfilService;
import com.example.portofolio.service.ProjectService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class DashboardController {

    private final ProfilService profilService;
    private final KontakService kontakService;
    private final PendidikanRepository pendidikanRepository;
    private final KeahlianService keahlianService;
    private final ProjectService projectService;

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
