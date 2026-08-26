package com.example.portofolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Kontak {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String telepon;
    private String github;
    private String instagram;
 
    public Kontak(){

    }

    public Kontak(String email, String telepon, String github, String instagram){
        this.email = email;
        this.telepon = telepon;
        this.github = github;
        this.instagram = instagram;
    }

    public Long getId(){
        return id;
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getTelepon(){
        return telepon;
    }
    public void setTelepon(String telepon){
        this.telepon = telepon;
    }

    public String getGithub(){
        return github;
    }
    public void setGithub(String github){
        this.github = github;
    }

    public String getInstagram(){
        return instagram;
    }
    public void setInstagram(String instagram){
        this.instagram = instagram;
    }
}
