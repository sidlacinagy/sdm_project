package com.example.user_management_system.user;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@NoArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public void registerUser(User user) throws IllegalStateException {
        boolean emailAlreadyInUse = getUserByEmail(user.getEmail()).isPresent();
        if (emailAlreadyInUse) {
            throw new IllegalStateException("Email already in use");
        }
        boolean nicknameAlreadyInUse = getUserByNickname(user.getNickname()).isPresent();
        if (nicknameAlreadyInUse) {
            throw new IllegalStateException("Nickname already in use");
        }
        else {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
    }

    public void enableUser(User user) {
        user.setEnabled(true);
        userRepository.save(user);
    }

    public void incrementUserWatchtime(User user, int runtime){
        user.incrementWatchtime(runtime);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findById(email);
    }

    public Optional<User> getUserByNickname(String nickname){
        return userRepository.findByNickname(nickname);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findById(email).orElseThrow(() -> new UsernameNotFoundException("No user defined with such email"));

    }

    public void changePassword(User user, String newPassword) {
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
