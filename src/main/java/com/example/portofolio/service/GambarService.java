package com.example.portofolio.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Gambar;
import com.example.portofolio.repository.GambarRepository;

@Service
public class GambarService {
    @Autowired
    private GambarRepository gambarRepository;

    public GambarService(GambarRepository gambarRepository){
        this.gambarRepository = gambarRepository;
    }

    public Gambar tambahGambar(Gambar gambar){
        return gambarRepository.save(gambar);
    }

    public List<Gambar> semuaGambar(){
        return gambarRepository.findAll();
    }

    public void hapusGambar(Long id){
        gambarRepository.deleteById(id);
    }

}
