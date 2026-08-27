package com.example.portofolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.portofolio.model.Kontak;
import com.example.portofolio.service.KontakService;


@Controller
public class EditKontakController {

    @Autowired
    private KontakService kontakService;

    public EditKontakController(KontakService kontakService){
        this.kontakService = kontakService;
    }

    @GetMapping("/dashboard/editKontak")
    public String editKontak(Model model){
        Kontak kontak = kontakService.cariSesuaiId(1L).orElse(new Kontak());
        model.addAttribute("kontak", kontak);
        return "editKontak";
    }

    @PostMapping("/dashboard/editKontak")
    public String updateKontak(@ModelAttribute Kontak kontak, RedirectAttributes redirectAttributes){
        if (kontakService.cariSesuaiId(1L).isPresent()) {
            kontakService.updateKontak(1L, kontak);
        } else {
            kontakService.tambahKontak(kontak);
        }
        return "redirect:/editKontak";
    }
}
