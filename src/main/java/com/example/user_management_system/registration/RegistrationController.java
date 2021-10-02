package com.example.user_management_system.registration;

import com.example.user_management_system.user.User;
import com.example.user_management_system.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/register")
@AllArgsConstructor
public class RegistrationController {

    private final UserService userService;

    @PostMapping
    public String postRegistration(@ModelAttribute Request request) {
        if (!isMatchingPassword(request.getPassword(), request.getPassword_confirm())) {
            throw new IllegalStateException("Passwords not matching");
        }
        User user = new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());
        userService.registerUser(user);
        return "Successful registration!";
    }

    public boolean isMatchingPassword(String password, String password_confirm) {
        return password.equals(password_confirm);
    }

}
