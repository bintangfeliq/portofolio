package com.example.portofolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
    
    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @PostMapping("/login")
    public String prosesLogin(@RequestParam String username, @RequestParam String password) {
        if ("admin".equals(username) && "12345678".equals(password)) {
            return "dashboard";
        } else {
            return "login";
        }
    }

}
