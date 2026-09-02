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
import com.example.portofolio.model.Project;
import com.example.portofolio.service.GambarService;
import com.example.portofolio.service.ProjectService;


@Controller
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private GambarService gambarService;

   public ProjectController(ProjectService projectService, GambarService gambarService){
    this.projectService = projectService;
    this.gambarService = gambarService;
   }

    @GetMapping("/dashboard/dashboardProject")
    public String editProject(Model model) {
        model.addAttribute("projects", projectService.semuaProject());
        return "dashboardProject";
    }

    @PostMapping("/dashboard/project/tambah")
    public String tambahProject(@ModelAttribute Project project, @RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        simpanGambar(projectService.tambahProject(project), files);
        return "redirect:/dashboard/dashboardProject";
    }

    @GetMapping("/dashboard/dashboardProject/editProject/{id}")
    public String halamanUpdate(@PathVariable Long id, Model model) {
        model.addAttribute("project", projectService.cariSesuaiId(id).orElse(new Project()));
        return "editProject";
    }

    @PostMapping("/dashboard/dashboardProject/editProject/{id}")
    public String updateProject(@PathVariable Long id, @ModelAttribute Project project,@RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        simpanGambar(projectService.updateProject(id, project), files);
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

    public void simpanGambar(Project project, MultipartFile[] files) throws IOException {
    Path folder = Paths.get("src/main/resources/static/images/");
    for (MultipartFile file : files) {
        if (!file.isEmpty()) {
            String nama = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), folder.resolve(nama),StandardCopyOption.REPLACE_EXISTING);

            Gambar gambar = new Gambar();
            gambar.setGambar(nama);
            gambar.setProject(project);
            gambarService.tambahGambar(gambar);
            }
        }
    }
}
