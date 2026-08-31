package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Project;
import com.example.portofolio.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    //create
    public Project tambahProject(Project project){
        return projectRepository.save(project);
    }

    //read semua
    public List<Project> semuaProject(){
        return projectRepository.findAll();
    }

    public List<Project> SemuaProject(){
        return projectRepository.findAll();
    }

    //read berdasarkan id
    public Optional<Project> cariSesuaiId(Long id){
        return projectRepository.findById(id);
    }

    //update
    public Project updateProject(Long id, Project dataBaru){
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project Tidak Ada"));
        project.setNamaProject(dataBaru.getNamaProject());
        project.setDeskripsi(dataBaru.getDeskripsi());
        project.setTeknologi(dataBaru.getTeknologi());
        return projectRepository.save(project);
    }

    //delete
    public void hapusProject(Long id){
        projectRepository.deleteById(id);
    }
}
