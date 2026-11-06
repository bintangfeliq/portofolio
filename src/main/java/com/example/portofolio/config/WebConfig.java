package com.example.portofolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@SuppressWarnings("all")
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;

    WebConfig(AuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/dashboard", "/dashboard/**")
                .excludePathPatterns("/login", "/logout", "/css/**", "/js/**", "/images/**");
    }
}
