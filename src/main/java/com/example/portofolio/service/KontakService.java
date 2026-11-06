package com.example.portofolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.portofolio.model.Kontak;
import com.example.portofolio.repository.KontakRepository;

@Service
@SuppressWarnings("all")
public class KontakService {

    @Autowired
    private KontakRepository kontakRepository;

    public KontakService(KontakRepository kontakRepository){
        this.kontakRepository = kontakRepository;
    }

    public Kontak tambahKontak(Kontak kontak){
        return kontakRepository.save(kontak);
    }

    public List<Kontak> semuaKontak(){
        return kontakRepository.findAll();
    }

    public Optional<Kontak> cariSesuaiId(Long id){
        Optional<Kontak> opt = kontakRepository.findById(id);
        if (opt.isPresent()) {
            return opt;
        }
        List<Kontak> all = kontakRepository.findAll();
        if (!all.isEmpty()) {
            return Optional.of(all.get(0));
        }
        Kontak defaultKontak = new Kontak();
        defaultKontak.setEmail("bintangfeliq1@gmail.com");
        defaultKontak.setTelepon("+62 851-2123-4353");
        defaultKontak.setGithub("https://github.com/bintangfeliq/");
        defaultKontak.setInstagram("https://www.instagram.com/bntng.blue/");
        return Optional.of(kontakRepository.save(defaultKontak));
    }

    public Kontak updateKontak(Long id, Kontak dataBaru){
        Kontak kontak = cariSesuaiId(id).orElseGet(() -> new Kontak());
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
