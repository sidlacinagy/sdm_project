package com.example.user_management_system.ui;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class LoginController {

    @GetMapping("/home")
    public String viewLoginPage() {
            return "login";
        }

    @GetMapping("/profile_home")
    public String viewProfile() {return "profile_home";}

    @GetMapping("/reset**")
    public String viewReset() {return "reset";}

}


