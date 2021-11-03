package com.example.user_management_system.registration;

import com.example.user_management_system.email.EmailSender;
import com.example.user_management_system.user.User;
import com.example.user_management_system.user.UserService;
import com.example.user_management_system.verification.Token;
import com.example.user_management_system.verification.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import java.io.IOException;
import java.util.Optional;

@Service
public class RegistrationService {

    private final TokenService tokenService;

    private final EmailSender emailSender;

    private final UserService userService;

    @Autowired
    public RegistrationService(TokenService tokenService, EmailSender emailSender, UserService userService){
        this.tokenService = tokenService;
        this.emailSender = emailSender;
        this.userService = userService;
    }

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
            emailSender.send(emailSender.createVerificationMessage(user.getEmail(), user.getFirstName(), "http://localhost:8080/confirm?token=" + token.getToken()));
        } catch (IOException | MessagingException ioException) {
            return false;
        }
        return true;
    }

    public boolean sendPasswordResetEmail(String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isEmpty()) {
            return false;
        }
        try {
            Token token = createToken(user.get());
            emailSender.send(emailSender.createPasswordResetMessage(email, "http://localhost:8080/reset?token=" + token.getToken()));
        } catch (IOException | MessagingException ioException) {
            return false;
        }
        return true;
    }

    public boolean changePassword(String password, String token) {
        Optional<User> user=getUserByToken(token);
        if (user.isEmpty()) {
            return false;
        }

        userService.changePassword(user.get(), password);
        return true;
    }

    public boolean enableAccount(String token) {
        Optional<User> user=getUserByToken(token);
        if (user.isEmpty()) {
            return false;
        }
        if (user.get().isEnabled())
            return false;
        userService.enableUser(user.get());
        return true;
    }

    public Optional<User> getUserByToken(String token){
        Optional<Token> userToken = tokenService.getToken(token);
        if (userToken.isEmpty()) {
            return Optional.empty();
        }
        return userService.getUserByEmail(userToken.get().getUserEmail());
    }
}
