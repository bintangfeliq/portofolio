package com.example.portofolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.portofolio.model.Keahlian;
import com.example.portofolio.model.Kontak;
import com.example.portofolio.model.Pendidikan;
import com.example.portofolio.model.Profil;
import com.example.portofolio.repository.PendidikanRepository;
import com.example.portofolio.service.KeahlianService;
import com.example.portofolio.service.ProfilService;
import com.example.portofolio.service.KontakService;

@Controller
public class PortofolioController {
    @Autowired
    private ProfilService profilService;
    @Autowired
    private KontakService kontakService;
    @Autowired
    private PendidikanRepository pendidikanRepository;
    @Autowired
    private KeahlianService keahlianService;

    public PortofolioController(ProfilService profilService, 
                                KontakService kontakService, 
                                PendidikanRepository pendidikanRepository,
                                KeahlianService keahlianService){
        this.profilService = profilService;
        this.kontakService = kontakService;
        this.pendidikanRepository = pendidikanRepository;
        this.keahlianService = keahlianService;
    }

    @GetMapping("/")
    public String index(Model model){
        Profil profil = profilService.cariSesuaiId(1L).orElse(null);
        Kontak kontak = kontakService.cariSesuaiId(1L).orElse(null);
        List<Pendidikan> pendidikan = pendidikanRepository.findAllByOrderByTahunMulaiAsc();
        List<Keahlian> keahlian = keahlianService.semuaKeahlian();

        model.addAttribute("pendidikan", pendidikan);
        model.addAttribute("profil", profil);
        model.addAttribute("kontak", kontak);
        model.addAttribute("keahlian", keahlian);
        return "index";
    }
    
}
