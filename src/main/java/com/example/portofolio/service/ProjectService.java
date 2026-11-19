package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.portofolio.model.Gambar;
import com.example.portofolio.model.Project;
import com.example.portofolio.repository.ProjectRepository;
import com.example.portofolio.util.UploadHelper;

@Service
@SuppressWarnings("all")
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UploadHelper uploadHelper;

    public ProjectService(ProjectRepository projectRepository, UploadHelper uploadHelper) {
        this.projectRepository = projectRepository;
        this.uploadHelper = uploadHelper;
    }

    public Project tambahProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> semuaProject() {
        return projectRepository.findAll();
    }

    public Optional<Project> cariSesuaiId(Long id) {
        return projectRepository.findById(id);
    }

    public Project updateProject(Long id, Project dataBaru) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project Tidak Ada"));
        project.setNamaProject(dataBaru.getNamaProject());
        project.setDeskripsi(dataBaru.getDeskripsi());
        project.setTeknologi(dataBaru.getTeknologi());
        return projectRepository.save(project);
    }

    public void hapusProject(Long id) {
        projectRepository.findById(id).ifPresent(project -> {
            if (project.getGambar() != null) {
                for (Gambar g : project.getGambar()) {
                    uploadHelper.deleteFileQuietly(g.getGambar());
                }
            }
            projectRepository.deleteById(id);
        });
    }
}
