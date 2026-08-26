package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Profil;
import com.example.portofolio.repository.ProfilRepository;

@Service
public class ProfilService {
    @Autowired
    private ProfilRepository profilRepository;

    public ProfilService(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }
 
    public Profil tambahProfil(Profil profil){
        return profilRepository.save(profil);
    }

    public List<Profil> semuaProfil(){
        return profilRepository.findAll();
    }

    public Optional<Profil> cariSesuaiId(Long id){
        return profilRepository.findById(id);
    }

    public Profil updateProfil(Long id, Profil dataBaru){
        Profil profil = profilRepository.findById(id).orElseThrow(() -> new RuntimeException("Profil tidak ada"));
        profil.setNama(dataBaru.getNama());
        profil.setAlamat(dataBaru.getAlamat());
        profil.setMapUrl(dataBaru.getMapUrl());
        profil.setDeskripsi(dataBaru.getDeskripsi());
        profil.setFoto(dataBaru.getFoto());
        return profilRepository.save(profil);
    }

    public void hapusProfil(Long id){
        profilRepository.deleteById(id);
    }

}
