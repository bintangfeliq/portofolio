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

    public Optional<Pendidikan> cariSesuaiId(Long id){
       return pendidikanRepository.findById(id);
    }

    public Pendidikan updatPendidikan(Long id, Pendidikan databaru){
        Pendidikan pendidikan = pendidikanRepository.findById(id).orElseThrow(() ->  new RuntimeException("Pendidikan tidak ada!!!"));
        pendidikan.setTingkat(databaru.getTingkat());
        pendidikan.setNama(databaru.getNama());
        pendidikan.setTahunMulai(databaru.getTahunMulai());;
        pendidikan.setTahunselsai(databaru.getTahunSelsai());
        return pendidikanRepository.save(pendidikan);
    }

    public void hapusPendidikan(Long id){
        pendidikanRepository.deleteById(id);
    }
}
