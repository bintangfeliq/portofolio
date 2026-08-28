package com.example.portofolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.portofolio.model.Keahlian;
import com.example.portofolio.service.KeahlianService;

@Controller
public class EditKeahlianController {

    private final KeahlianService keahlianService;

    public EditKeahlianController(KeahlianService keahlianService) {
        this.keahlianService = keahlianService;
    }

    @GetMapping("/dashboard/dashboardKeahlian")
    public String editKeahlian(Model model) {
        model.addAttribute("keahlian", keahlianService.semuaKeahlian());
        return "dashboardKeahlian";
    }

    @PostMapping("/dashboard/keahlian/tambah")
    public String tambahKeahlian(@ModelAttribute Keahlian keahlian) {
        keahlianService.tambahKeahlian(keahlian);
        return "redirect:/dashboard/dashboardKeahlian";
    }

    @PostMapping("/dashboard/dashboardKeahlian/editKeahlian/{id}")
    public String updateKeahlian(@PathVariable Long id, @ModelAttribute Keahlian keahlian) {
        keahlianService.updateKeahlian(id, keahlian);
        return "redirect:/dashboard/dashboardKeahlian";
    }

    @GetMapping("/dashboard/dashboardKeahlian/editKeahlian/{id}")
    public String halamanUpdate(@PathVariable Long id, Model model){
        Keahlian keahlian = keahlianService.cariSesuaiId(id).orElseThrow(() -> new RuntimeException("Keahlian tidak ada"));
        model.addAttribute("keahlian", keahlian);
        return "editKeahlian";
    }

    @GetMapping("/dashboard/dashboardKeahlian/hapusKeahlian/{id}")
    public String hapusKeahlian(@PathVariable Long id) {
        keahlianService.hapusKeahlian(id);
        return "redirect:/dashboard/dashboardKeahlian";
    }
}
