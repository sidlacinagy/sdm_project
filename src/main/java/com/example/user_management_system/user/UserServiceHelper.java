package com.example.user_management_system.user;

import com.example.user_management_system.email.EmailSender;
import com.example.user_management_system.verification.Token;
import com.example.user_management_system.verification.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.io.IOException;

@Component
@AllArgsConstructor
public class UserServiceHelper {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailSender emailSender;


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

}
