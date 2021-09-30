package com.example.user_management_system.user;

import com.example.user_management_system.verification.Token;
import com.example.user_management_system.verification.TokenController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenController tokenController;


    public void registerUser(User user){
        boolean usernameInUse=getUserByEmail(user.getEmail()).isPresent();
        if(usernameInUse){
            if(!user.isActivated()){
                //TODO send new activation email
            }
            else
                throw new IllegalStateException("Email already in use");
        }

        //TODO setting the password
        userRepository.save(user);

        Token verificationToken=new Token(user.getId());
        tokenController.saveToken(verificationToken);

        //TODO send email with token
    }

    public void activateUser(User user){
        user.setActivated(true);
        userRepository.save(user);
    }

    public List<User> getAllUsers(){
        List<User> users=new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public Optional<User> getUserByEmail(String email){
        List<User> users=getAllUsers();
        User searchedUser=users.stream().filter(user->user.getEmail().equals(email)).findFirst().orElse(null);
        return searchedUser==null? Optional.empty():userRepository.findById(searchedUser.getId());
    }
}
