package com.example.portofolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.portofolio.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{
    
}
