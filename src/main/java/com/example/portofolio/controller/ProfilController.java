package com.example.portofolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.portofolio.model.Profil;
import com.example.portofolio.service.ProfilService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/profils")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    public ProfilController(ProfilService profilService) {
        this.profilService = profilService;
    }

    @PostMapping
    public Profil tambahProfil(@RequestBody Profil profil) {
        return profilService.tambahProfil(profil);
    }

    @GetMapping
    public List<Profil> semuaProfil() {
        return profilService.semuaProfil();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> cariSesuaiId(@PathVariable Long id) {
        return profilService.cariSesuaiId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Profil updateProfil(@PathVariable Long id, @RequestBody Profil profil) {
        return profilService.updateProfil(id, profil);
    }
    
    @DeleteMapping("/{id}")
    public String hapusProfil(@PathVariable Long id){
        profilService.hapusProfil(id);
        return "Profil dengan ID " + id + " telah dihapus";
    }
    
}
