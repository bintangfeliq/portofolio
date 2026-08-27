package com.example.portofolio.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Kontak;
import com.example.portofolio.repository.KontakRepository;

@Service
public class KontakService {

    @Autowired
    private KontakRepository kontakRepository;

    public KontakService(KontakRepository kontakRepository){
        this.kontakRepository = kontakRepository;
    }

    public Kontak tambahKontak(Kontak kontak){
        return kontakRepository.save(kontak);
    }

    public Optional<Kontak> cariSesuaiId(Long id){
        return kontakRepository.findById(id);
    }

    public Kontak updateKontak(Long id, Kontak dataBaru){
        Kontak kontak = kontakRepository.findById(id).orElseThrow(() -> new RuntimeException("Kontak tidak ditemukan"));
        kontak.setEmail(dataBaru.getEmail());
        kontak.setTelepon(dataBaru.getTelepon());
        kontak.setGithub(dataBaru.getGithub());
        kontak.setInstagram(dataBaru.getInstagram());
        return kontakRepository.save(kontak);
    }

    public void hapusKontak(Long id){
        kontakRepository.deleteById(id);
    }
}
