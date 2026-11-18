package com.example.portofolio.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest; // Gunakan jakarta.* untuk Spring Boot 3 / Java 21
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.portofolio.model.Keahlian;
import com.example.portofolio.model.Kontak;
import com.example.portofolio.model.Pendidikan;
import com.example.portofolio.model.Profil;
import com.example.portofolio.repository.PendidikanRepository;
import com.example.portofolio.service.KeahlianService;
import com.example.portofolio.service.KontakService;
import com.example.portofolio.service.ProfilService;
import com.example.portofolio.service.ProjectService;

@Controller
public class PortofolioController {

    private final ProfilService profilService;
    private final KontakService kontakService;
    private final PendidikanRepository pendidikanRepository;
    private final KeahlianService keahlianService;
    private final ProjectService projectService;

    public PortofolioController(ProfilService profilService, KontakService kontakService, PendidikanRepository pendidikanRepository, KeahlianService keahlianService, ProjectService projectService) {
        this.profilService = profilService;
        this.kontakService = kontakService;
        this.pendidikanRepository = pendidikanRepository;
        this.keahlianService = keahlianService;
        this.projectService = projectService;
    }

    private boolean isMobileDevice(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        if (userAgent == null) return false;
        String agent = userAgent.toLowerCase();
        return agent.contains("mobi") || agent.contains("android") || agent.contains("iphone") || agent.contains("ipad") || agent.contains("ipod");
    }

    @GetMapping("/")
    public String index(Model model, HttpServletRequest request) {
        Profil profil = profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        Kontak kontak = kontakService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Kontak tidak ada"));
        List<Pendidikan> pendidikan = pendidikanRepository.findAllByOrderByTahunMulaiAsc();
        List<Keahlian> keahlian = keahlianService.semuaKeahlian();
        
        model.addAttribute("pendidikan", pendidikan);
        model.addAttribute("profil", profil);
        model.addAttribute("kontak", kontak);
        model.addAttribute("keahlian", keahlian);
        model.addAttribute("projects", projectService.semuaProject());
        if (isMobileDevice(request)) {
            return "indexMobile";
        }  
        return "index"; 
    }

    @GetMapping({"/tentang", "/profil"})
    public String tentang(Model model, HttpServletRequest request) {
        Profil profil = profilService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        Kontak kontak = kontakService.cariSesuaiId(1L).orElseThrow(() -> new RuntimeException("Kontak tidak ada"));
        List<Pendidikan> pendidikan = pendidikanRepository.findAllByOrderByTahunMulaiAsc();
        List<Keahlian> keahlian = keahlianService.semuaKeahlian();
        
        model.addAttribute("pendidikan", pendidikan);
        model.addAttribute("profil", profil);
        model.addAttribute("kontak", kontak);
        model.addAttribute("keahlian", keahlian);
        model.addAttribute("projects", projectService.semuaProject());
        if (isMobileDevice(request)) {
            return "tentangMobile";
        }
        return "tentang";
    }
}