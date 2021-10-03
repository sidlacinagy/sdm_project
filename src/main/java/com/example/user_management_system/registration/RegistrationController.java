package com.example.user_management_system.registration;

import com.example.user_management_system.email.EmailSender;
import com.example.user_management_system.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;


    @PostMapping(path = "/home", params = "signUp")
    public String postRegistration(@ModelAttribute Request request) {
        if (!isMatchingPassword(request.getPassword(), request.getPassword_confirm())) {
            throw new IllegalStateException("Passwords not matching");
        }
        if (registrationService.registration(request))
            return "Successful registration!";
        return "Unsuccessful registration.";
    }

    @GetMapping(path = "/confirm")
    public String getConfirm(@RequestParam(name = "token") String token) {
        if (registrationService.enableAccount(token))
            return "Account successfully confirmed!";
        return "Cannot confirm account.";
    }

    @PostMapping(path = "/home", params = "resetPassword")
    public String postResetEmail( @RequestParam String email) {
        if(registrationService.sendPasswordResetEmail(email)){
            return "Password reset email sent.";
        }
        else {
            return "Cannot send email.";
        }
    }

    @PostMapping(path = "/reset**")
    public String postResetPassword(@RequestParam(name = "token") String token,@RequestParam (name = "password") String password,
                                    @RequestParam (name = "password_confirm") String password_confirm) {
        if(!isMatchingPassword(password,password_confirm)){
            return "Passwords not matching";
        }
        if(registrationService.changePassword(password, token))
            return "Password successfully changed.";

        return "Cannot change password.";

    }

    public boolean isMatchingPassword(String password, String password_confirm) {
        return password.equals(password_confirm);
    }

}
