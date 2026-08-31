package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Pendidikan;
import com.example.portofolio.repository.PendidikanRepository;

@Service
public class PendidikanService {
    
    @Autowired
    private PendidikanRepository pendidikanRepository;

    public PendidikanService(PendidikanRepository pendidikanRepository){
        this.pendidikanRepository = pendidikanRepository;
    }

    public Pendidikan tambahPendidikan(Pendidikan pendidikan){
        return pendidikanRepository.save(pendidikan);
    }

    public List<Pendidikan> semuPendidikan(){
        return pendidikanRepository.findAll();
    }

    public List<Pendidikan> semuaPendidikan(){
        return pendidikanRepository.findAll();
    }

    public Optional<Pendidikan> cariSesuaiId(Long id){
       return pendidikanRepository.findById(id);
    }

    public Pendidikan updatePendidikan(Long id, Pendidikan dataBaru){
        Pendidikan pendidikan = pendidikanRepository.findById(id).orElseThrow(() -> new RuntimeException("Pendidikan tidak ada"));
        pendidikan.setTingkat(dataBaru.getTingkat());
        pendidikan.setNama(dataBaru.getNama());
        pendidikan.setTahunMulai(dataBaru.getTahunMulai());
        pendidikan.setTahunSelsai(dataBaru.getTahunSelsai());
        return pendidikanRepository.save(pendidikan);
    }

    public Pendidikan updatPendidikan(Long id, Pendidikan dataBaru){
        return updatePendidikan(id, dataBaru);
    }

    public void hapusPendidikan(Long id){
        pendidikanRepository.deleteById(id);
    }
}
