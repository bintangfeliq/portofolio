package com.example.portofolio.service;

import org.springframework.stereotype.Service;

import com.example.portofolio.model.Gambar;
import com.example.portofolio.repository.GambarRepository;
import com.example.portofolio.util.UploadHelper;

@Service
@SuppressWarnings("all")
public class GambarService {

    private final GambarRepository gambarRepository;
    private final UploadHelper uploadHelper;

    public GambarService(GambarRepository gambarRepository, UploadHelper uploadHelper) {
        this.gambarRepository = gambarRepository;
        this.uploadHelper = uploadHelper;
    }

    public Gambar tambahGambar(Gambar gambar) {
        return gambarRepository.save(gambar);
    }

    public void hapusGambar(Long id) {
        gambarRepository.findById(id).ifPresent(gambar -> {
            uploadHelper.deleteFileQuietly(gambar.getGambar());
            gambarRepository.deleteById(id);
        });
    }
}
