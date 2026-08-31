package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Keahlian;
import com.example.portofolio.repository.KeahlianRepository;

@Service
public class KeahlianService {
    @Autowired
    private KeahlianRepository keahlianRepository;

    public KeahlianService(KeahlianRepository keahlianRepository){
        this.keahlianRepository = keahlianRepository;
    }

    public Keahlian tambahKeahlian(Keahlian keahlian){
        return keahlianRepository.save(keahlian);
    }

    public List<Keahlian> semuaKeahlian(){
        return keahlianRepository.findAll();
    }

    public Optional<Keahlian> cariSesuaiId(Long id){
        return keahlianRepository.findById(id);
    }

    public Keahlian updateKeahlian(Long id, Keahlian dataBaru){
        Keahlian keahlian = keahlianRepository.findById(id).orElseThrow(() -> new RuntimeException("Keahlian tidak ada"));
        keahlian.setNama(dataBaru.getNama());
        keahlian.setDeskripsi(dataBaru.getDeskripsi());
        return keahlianRepository.save(keahlian);
    }

    public void hapusKeahlian(Long id){
        keahlianRepository.deleteById(id);
    }
}
