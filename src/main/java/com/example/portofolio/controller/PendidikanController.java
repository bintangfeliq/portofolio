package com.example.portofolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.portofolio.model.Pendidikan;
import com.example.portofolio.service.PendidikanService;

@Controller
public class PendidikanController {

    @Autowired
    private PendidikanService pendidikanService;

    PendidikanController(PendidikanService pendidikanService) {
        this.pendidikanService = pendidikanService;
    }

    @GetMapping("/dashboard/dashboardPendidikan")
    public String editPendidikan(Model model) {
        model.addAttribute("pendidikan", pendidikanService.semuaPendidikan());
        return "dashboardPendidikan";
    }

    @PostMapping("/dashboard/pendidikan/tambah")
    public String tambahPendidikan(@ModelAttribute Pendidikan pendidikan) {
        pendidikanService.tambahPendidikan(pendidikan);
        return "redirect:/dashboard/dashboardPendidikan";
    }

    @GetMapping("/dashboard/dashboardPendidikan/editPendidikan/{id}")
    public String halamanUpdate(@PathVariable Long id, Model model) {
        model.addAttribute("pendidikan", pendidikanService.cariSesuaiId(id).get());
        return "editPendidikan";
    }

    @PostMapping("/dashboard/dashboardPendidikan/editPendidikan/{id}")
    public String updatePendidikan(@PathVariable Long id, @ModelAttribute Pendidikan pendidikan) {
        pendidikanService.updatePendidikan(id, pendidikan);
        return "redirect:/dashboard/dashboardPendidikan";
    }

    @GetMapping("/dashboard/dashboardPendidikan/hapusPendidikan/{id}")
    public String hapusPendidikan(@PathVariable Long id) {
        pendidikanService.hapusPendidikan(id);
        return "redirect:/dashboard/dashboardPendidikan";
    }
}
