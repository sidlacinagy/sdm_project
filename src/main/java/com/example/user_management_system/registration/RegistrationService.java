package com.example.user_management_system.registration;

import com.example.user_management_system.email.EmailSender;
import com.example.user_management_system.user.User;
import com.example.user_management_system.user.UserService;
import com.example.user_management_system.verification.Token;
import com.example.user_management_system.verification.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.Properties;

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

    public String registration(Request request) {
        if (!emailSender.isValidEmailAddress(request.getEmail()))
            return "Not a valid email!";
        User user = new User(request.getNickname(),request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());
        String msg=userService.registerUser(user);
        if("Successful registration".equals(msg)){
        sendVerificationEmail(user);
        }
        return msg;

    }

    public Token createToken(User user) {
        Token verificationToken = new Token(user.getEmail());
        tokenService.saveToken(verificationToken);
        return verificationToken;
    }

    public boolean sendVerificationEmail(User user) {
        Token token = createToken(user);
        try(InputStream input = new FileInputStream("src/main/resources/application.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            String port = prop.getProperty("server.port");
            emailSender.send(emailSender.createVerificationMessage(user.getEmail(), user.getFirstName(), "http://localhost:" + port + "/confirm?token=" + token.getToken()));
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
        try(InputStream input = new FileInputStream("src/main/resources/application.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            String port = prop.getProperty("server.port");
            Token token = createToken(user.get());
            emailSender.send(emailSender.createPasswordResetMessage(email, "http://localhost:" + port + "/reset?token=" + token.getToken()));
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
