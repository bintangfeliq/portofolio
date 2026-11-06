package com.example.portofolio.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.portofolio.model.User;
import com.example.portofolio.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login(HttpSession session) {
        if (session != null && session.getAttribute("user") != null) {
            return "redirect:/dashboard";
        }
        return "login";
    }

    @PostMapping("/login")
    public String prosesLogin(@RequestParam String username,
                              @RequestParam String password,
                              HttpSession session,
                              Model model) {
        Optional<User> userOpt = userRepository.findByUsername(username != null ? username.trim() : "");
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            session.setAttribute("user", userOpt.get());
            return "redirect:/dashboard";
        }
        model.addAttribute("pesanError", "Username atau password salah");
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/login";
    }
}
