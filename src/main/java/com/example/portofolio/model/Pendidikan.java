package com.example.portofolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pendidikan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tingkat;
    private String nama;
    private Integer tahunMulai;
    private Integer tahunSelsai;

    public Pendidikan(){
        
    }

    public Pendidikan(String tingkat, String nama, Integer tahunMulai, Integer tahunSelsai){
        this.tingkat = tingkat;
        this.nama = nama;
        this.tahunMulai = tahunMulai;
        this.tahunSelsai = tahunSelsai;
    }

    public Long getId(){
        return id;
    }
    public String getTingkat(){
        return tingkat;
    }
    public void setTingkat(String tingkat){
        this.tingkat = tingkat;
    }

    public String getNama(){
        return nama;
    }
    public void setNama(String nama){
        this.nama = nama;
    }

    public Integer getTahunMulai(){
        return tahunMulai;
    }
    public void setTahunMulai(Integer tahunMulai){
        this.tahunMulai = tahunMulai;
    }

    public Integer getTahunSelsai(){
        return tahunSelsai;
    }
    public void setTahunselsai(Integer tahunSelsai){
        this.tahunSelsai = tahunSelsai;
    }

}
