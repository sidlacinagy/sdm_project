package com.example.user_management_system.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class UserController {

    private UserRepository userRepository;

    public void save(User user){
        userRepository.save(user);
    }
}
