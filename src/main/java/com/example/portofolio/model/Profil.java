package com.example.portofolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Profil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nama;
    private String alamat;
    private String mapUrl;
    private String deskripsi;
    private String foto;

    public Profil(){
        
    }

    public Profil(String nama, String alamat, String deskripsi, String foto){
        this.nama = nama;
        this.alamat = alamat;
        this.deskripsi = deskripsi;
        this.foto = foto;
    }

    public Long getId(){
        return id;
    }

    public String getNama(){
        return nama;
    }
    public void setNama(String nama){
        this.nama = nama;
    }

    public String getAlamat(){
        return alamat;
    }
    public void setAlamat(String alamat){
        this.alamat = alamat;
    }

    public String getMapUrl(){
        return mapUrl;
    }
    public void setMapUrl(String mapUrl){
        this.mapUrl = mapUrl;
    }

    public String getDeskripsi(){
        return deskripsi;
    }
    public void setDeskripsi(String deskripsi){
        this.deskripsi = deskripsi;
    }

    public String getFoto(){
        return foto;
    }
    public void setFoto(String foto){
        this.foto = foto;
    }
}
