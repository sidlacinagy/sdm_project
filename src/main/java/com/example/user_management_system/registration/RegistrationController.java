package com.example.user_management_system.registration;


import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import java.util.List;


@RestController
@RequestMapping
@AllArgsConstructor
@CrossOrigin
public class RegistrationController {

    private final RegistrationService registrationService;

    private static String currentException;

    private List<String> loginList;

    @PostMapping(path = "/home", params = "resetPassword")
    public ModelAndView postResetEmail(@RequestParam String email) {
        if (registrationService.sendPasswordResetEmail(email)) {
            return new ModelAndView("redirect:/home");
        } else {
            throw new IllegalStateException("Cannot send email.");
        }
    }

    @GetMapping(path = "/confirm")
    public ModelAndView getConfirm(@RequestParam(name = "token") String token) {
        if (registrationService.enableAccount(token)) return new ModelAndView("redirect:/home");
        throw new IllegalStateException("Cannot confirm account.");
    }

    @ExceptionHandler(IllegalStateException.class)
    public ModelAndView handleError(Exception ex) {
        ModelAndView modelAndView = new ModelAndView("redirect:/home");
        currentException = ex.getMessage();
        return modelAndView;
    }

    public static boolean isMatchingPassword(String password, String password_confirm) {
        return password.equals(password_confirm);
    }

    public static String getCurrentException() {
        return currentException;
    }

    public static void setCurrentExceptionToNull() {
        currentException = null;
    }

    public List<String> getLoginList() {
        return loginList;
    }
}
