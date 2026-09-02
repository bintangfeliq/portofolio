package com.example.portofolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.portofolio.model.Kontak;
import com.example.portofolio.service.KontakService;


@Controller
public class KontakController {

    @Autowired
    private KontakService kontakService;

    public KontakController(KontakService kontakService){
        this.kontakService = kontakService;
    }

    @GetMapping("/dashboard/editKontak")
    public String editKontak(Model model) {
        model.addAttribute("kontak", kontakService.cariSesuaiId(1L).orElse(new Kontak()));
        return "editKontak";
    }

    @PostMapping("/dashboard/editKontak")
    public String updateKontak(@ModelAttribute Kontak kontak) {
        kontakService.updateKontak(1L, kontak);
        return "redirect:/dashboard/editKontak";
    }
}
