package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Profil;
import com.example.portofolio.repository.ProfilRepository;

@Service
@SuppressWarnings("all")
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
        Optional<Profil> opt = profilRepository.findById(id);
        if (opt.isPresent()) {
            return opt;
        }
        List<Profil> all = profilRepository.findAll();
        if (!all.isEmpty()) {
            return Optional.of(all.get(0));
        }
        Profil defaultProfil = new Profil();
        defaultProfil.setNama("Muhammad Bintang Feliq");
        defaultProfil.setAlamat("Kota Bandung, Jawa Barat");
        defaultProfil.setDeskripsi("Saya adalah siswa kelas XII RPL di SMK Assalaam Bandung yang memiliki minat dalam pengembangan perangkat lunak dan teknologi informasi. Saya senang belajar, bekerja dalam tekanan, serta terus mengembangkan keterampilan di bidang teknologi.");
        defaultProfil.setTentangSaya("Saya adalah siswa kelas XII Rekayasa Perangkat Lunak (RPL) di SMK Assalaam Bandung yang memiliki minat dalam pengembangan perangkat lunak dan teknologi informasi. Saya senang mempelajari pemrograman, pengembangan website, serta berbagai teknologi baru untuk meningkatkan kemampuan dan pengalaman saya. Di waktu luang, saya juga memiliki hobi bersepeda dan mengeksplorasi hal-hal baru di dunia teknologi. Saya senang bekerja dalam tim, berdiskusi, memecahkan masalah, dan terus belajar dari setiap pengalaman. Ke depannya, saya ingin menjadi seorang programmer sekaligus membangun usaha di bidang teknologi yang dapat memberikan manfaat bagi banyak orang.");
        defaultProfil.setFoto("1793933340951_profil (1).png");
        defaultProfil.setCv("1788229251963_CV.jpg");
        return Optional.of(profilRepository.save(defaultProfil));
    }
    public Profil updateProfil(Long id, Profil dataBaru){
        Profil profil = cariSesuaiId(id).orElseGet(() -> new Profil());
        profil.setNama(dataBaru.getNama());
        profil.setAlamat(dataBaru.getAlamat());
        profil.setDeskripsi(dataBaru.getDeskripsi());
        profil.setTentangSaya(dataBaru.getTentangSaya());
        profil.setFoto(dataBaru.getFoto());
        profil.setCv(dataBaru.getCv());
        return profilRepository.save(profil);
    }

    public void hapusProfil(Long id){
        profilRepository.deleteById(id);
    }
}