package com.example.portofolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.portofolio.model.Pendidikan;
import com.example.portofolio.service.PendidikanService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/pendidikan")
public class PendidikanController {

    @Autowired
    private PendidikanService pendidikanService;

    public PendidikanController(PendidikanService pendidikanService){
        this.pendidikanService = pendidikanService;
    }

    @PostMapping
    public Pendidikan tambahPendidikan(@RequestBody Pendidikan pendidikan){
        return pendidikanService.tambahPendidikan(pendidikan);
    }

    @GetMapping
    public List<Pendidikan> semuPendidikan(){
        return pendidikanService.semuPendidikan();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pendidikan> cariSesuaiId(@PathVariable Long id) {
        return pendidikanService.cariSesuaiId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Pendidikan updatePendidikan(@PathVariable Long id, @RequestBody Pendidikan pendidikan) { 
        return pendidikanService.updatPendidikan(id, pendidikan);
    }

    @DeleteMapping("/{id}")
    public String hapusPendidikan(@PathVariable Long id){
        pendidikanService.hapusPendidikan(id);
        return "pendidikan dengan ID " + id + " Telah dihapus";
    }   
    
}
