package com.example.portofolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.portofolio.model.Pendidikan;

public interface PendidikanRepository extends JpaRepository<Pendidikan, Long>{
    List<Pendidikan> findAllByOrderByTahunMulaiAsc();
}
