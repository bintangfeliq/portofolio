package com.example.portofolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.portofolio.model.Keahlian;
import com.example.portofolio.service.KeahlianService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/keahlian")
public class KeahlianController {
    @Autowired
    private KeahlianService keahlianService;

    public KeahlianController(KeahlianService keahlianService){
        this.keahlianService = keahlianService;
    }

    @GetMapping
    public List<Keahlian> semuaKeahlian(){
        return keahlianService.semuaKeahlian();
    }

    @PostMapping
    public Keahlian tambahKeahlian(@RequestBody Keahlian keahlian){
        return keahlianService.tambahKeahlian(keahlian);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Keahlian> cariSesuaiId(@PathVariable Long id) {
        return keahlianService.cariSesuaiId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Keahlian updateKeahlian(@PathVariable Long id, @RequestBody Keahlian keahlian) {
        return keahlianService.updateKeahlian(id, keahlian);
    }

    @DeleteMapping("/{id}")
    public String hapusKeahlian(@PathVariable Long id){
        keahlianService.hapusKeahlian(id);
        return "Keahlian dengan ID " + id + " telah dihapus";
    }
    
}
