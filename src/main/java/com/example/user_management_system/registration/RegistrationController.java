package com.example.user_management_system.registration;

import com.example.user_management_system.user.User;
import com.example.user_management_system.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "register")
@AllArgsConstructor
public class RegistrationController {

    private final UserService userService;

    @PostMapping
    public String postRegistration(@RequestBody Request request) {
        if (!isMatchingPassword(request.getPassword(), request.getPassword_confirm())) {
            throw new IllegalStateException("Passwords not matching");
        }
        User user = new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());
        userService.registerUser(user);
        return "e";
    }

    public boolean isMatchingPassword(String password, String password_confirm) {
        return password.equals(password_confirm);
    }

}
