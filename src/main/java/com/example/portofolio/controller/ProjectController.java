package com.example.portofolio.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.portofolio.model.Gambar;
import com.example.portofolio.model.Kontak;
import com.example.portofolio.model.Profil;
import com.example.portofolio.model.Project;
import com.example.portofolio.service.GambarService;
import com.example.portofolio.service.KontakService;
import com.example.portofolio.service.ProfilService;
import com.example.portofolio.service.ProjectService;

@Controller
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private GambarService gambarService;

    @Autowired
    private ProfilService profilService;

    @Autowired
    private KontakService kontakService;

    public ProjectController(ProjectService projectService, GambarService gambarService,
                             ProfilService profilService, KontakService kontakService) {
        this.projectService = projectService;
        this.gambarService = gambarService;
        this.profilService = profilService;
        this.kontakService = kontakService;
    }

    // === Halaman Publik Project (Dialihkan ke Section Project di Halaman Tentang) ===
    @GetMapping("/project")
    public String project() {
        return "redirect:/tentang#project";
    }

    // === Dashboard Kelola Project ===
    @GetMapping("/dashboard/dashboardProject")
    public String editProject(Model model) {
        model.addAttribute("projects", projectService.semuaProject());
        return "dashboardProject";
    }

    @PostMapping("/dashboard/project/tambah")
    public String tambahProject(@ModelAttribute Project project, 
                                @RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        Project saved = projectService.tambahProject(project);
        simpanGambar(saved, files);
        return "redirect:/dashboard/dashboardProject";
    }

    @GetMapping("/dashboard/dashboardProject/editProject/{id}")
    public String halamanUpdate(@PathVariable Long id, Model model) {
        model.addAttribute("project", projectService.cariSesuaiId(id).orElse(new Project()));
        return "editProject";
    }

    @PostMapping("/dashboard/dashboardProject/editProject/{id}")
    public String updateProject(@PathVariable Long id, 
                                @ModelAttribute Project project,
                                @RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        Project updated = projectService.updateProject(id, project);
        simpanGambar(updated, files);
        return "redirect:/dashboard/dashboardProject";
    }

    @GetMapping("/dashboard/dashboardProject/hapusGambar/{id}")
    public String hapusGambar(@PathVariable Long id, @RequestParam Long projectId) {
        gambarService.hapusGambar(id);
        return "redirect:/dashboard/dashboardProject/editProject/" + projectId;
    }

    @GetMapping("/dashboard/dashboardProject/hapusProject/{id}")
    public String hapusProject(@PathVariable Long id) {
        projectService.hapusProject(id);
        return "redirect:/dashboard/dashboardProject";
    }

    private void simpanGambar(Project project, MultipartFile[] files) throws IOException {
        if (files == null || files.length == 0) return;

        Path dirSrc = Paths.get("src/main/resources/static/images/");
        Path dirTarget = Paths.get("target/classes/static/images/");

        if (!Files.exists(dirSrc)) {
            Files.createDirectories(dirSrc);
        }

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String namaFile = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                
                Files.copy(file.getInputStream(), dirSrc.resolve(namaFile), StandardCopyOption.REPLACE_EXISTING);
                if (Files.exists(dirTarget)) {
                    Files.copy(file.getInputStream(), dirTarget.resolve(namaFile), StandardCopyOption.REPLACE_EXISTING);
                }

                Gambar g = new Gambar();
                g.setGambar(namaFile);
                g.setProject(project);
                gambarService.tambahGambar(g);
            }
        }
    }
}
