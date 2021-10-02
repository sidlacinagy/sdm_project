package com.example.user_management_system.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping(path = "/register")
    public String postRegistration(@ModelAttribute Request request) {
        if (!isMatchingPassword(request.getPassword(), request.getPassword_confirm())) {
            throw new IllegalStateException("Passwords not matching");
        }
        if (registrationService.registration(request))
            return "Successful registration!";
        return "Unsuccessful registration.";
    }

    @GetMapping(path = "/confirm")
    public String postConfirm(@RequestParam(name = "token") String token) {
        if (registrationService.enableAccount(token))
            return "Account successfully confirmed!";
        return "Cannot confirm account.";
    }

    public boolean isMatchingPassword(String password, String password_confirm) {
        return password.equals(password_confirm);
    }

}
