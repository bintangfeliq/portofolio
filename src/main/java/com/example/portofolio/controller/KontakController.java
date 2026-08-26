package com.example.portofolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.portofolio.model.Kontak;
import com.example.portofolio.service.KontakService;

@RestController
@RequestMapping("/api/kontak")
public class KontakController {
    
    @Autowired
    private KontakService kontakService;

    public KontakController(KontakService kontakService){
        this.kontakService = kontakService;
    }

    @PostMapping
    public Kontak tambahKontak(@RequestBody Kontak kontak){
        return kontakService.tambahKontak(kontak);
    }

    @GetMapping
    public List<Kontak> semuaKontak(){
        return kontakService.semuKontak();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kontak> cariSesuaiId(@PathVariable Long id){
        return kontakService.cariSesuaiId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    } 

    @PutMapping("/{id}")
    public Kontak updateKontak(@PathVariable Long id, @RequestBody Kontak kontak){
        return kontakService.updateKontak(id, kontak);
    }

    @DeleteMapping("/{id}")
    public String hapusKontak(@PathVariable Long id){
        kontakService.hapusKontak(id);
        return "Kontak dengan ID " + id + "telah dihapus";
    }
}
