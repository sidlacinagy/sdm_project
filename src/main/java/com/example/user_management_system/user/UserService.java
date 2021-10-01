package com.example.user_management_system.user;

import com.example.user_management_system.verification.Token;
import com.example.user_management_system.verification.TokenController;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenController tokenController;


    public void registerUser(User user) throws IllegalStateException{
        boolean usernameInUse=getUserByEmail(user.getEmail()).isPresent();
        if(usernameInUse){
            User oldUser=getUserByEmail(user.getEmail()).get();

            if(!oldUser.isActivated()){
                //TODO send new activation email
            }
            else
                throw new IllegalStateException("Email already in use");
        }
        else {

            //TODO setting the password
            userRepository.save(user);

            Token verificationToken = new Token(user.getEmail());
            tokenController.saveToken(verificationToken);

            //TODO send email with token
        }
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
        return userRepository.findById(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findById(email).orElseThrow(()->new UsernameNotFoundException("No user defined with such email"));

    }
}
