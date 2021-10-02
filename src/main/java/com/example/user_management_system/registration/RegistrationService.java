package com.example.user_management_system.registration;

import com.example.user_management_system.email.EmailSender;
import com.example.user_management_system.user.User;
import com.example.user_management_system.user.UserService;
import com.example.user_management_system.verification.Token;
import com.example.user_management_system.verification.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RegistrationService {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private final UserService userService;


    public boolean registration(Request request) {
        if (!emailSender.isValidEmailAddress(request.getEmail()))
            throw new IllegalStateException("Not a valid email!");
        User user = new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());
        userService.registerUser(user);
        sendVerificationEmail(user);
        return true;
    }

    public Token createToken(User user) {
        Token verificationToken = new Token(user.getEmail());
        tokenService.saveToken(verificationToken);
        return verificationToken;
    }

    public boolean sendVerificationEmail(User user) {
        Token token = createToken(user);
        try {
            emailSender.send(emailSender.createVerificationMessage(user.getEmail(), user.getFirstName(), "/regitrationConfirm.html?token=" + token.getToken()));
        } catch (IOException | MessagingException ioException) {
            //TODO Logging
            return false;
        }
        return true;
    }

    public boolean enableAccount(String token) {
        Optional<Token> userToken = tokenService.getToken(token);
        if (userToken.isEmpty()) {
            return false;
        }
        Optional<User> user = userService.getUserByEmail(userToken.get().getUserEmail());
        if (user.isEmpty()) {
            return false;
        }
        userService.enableUser(user.get());
        return true;
    }

}
