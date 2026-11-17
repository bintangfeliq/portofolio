package com.example.portofolio.service;

import org.springframework.stereotype.Service;

import com.example.portofolio.model.Gambar;
import com.example.portofolio.repository.GambarRepository;

@Service
@SuppressWarnings("all")
public class GambarService {

    private final GambarRepository gambarRepository;

    public GambarService(GambarRepository gambarRepository) {
        this.gambarRepository = gambarRepository;
    }

    public Gambar tambahGambar(Gambar gambar) {
        return gambarRepository.save(gambar);
    }

    public void hapusGambar(Long id) {
        gambarRepository.deleteById(id);
    }
}
