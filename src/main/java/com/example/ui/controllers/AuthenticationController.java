package com.example.ui.controllers;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import com.example.movie_management.apihelper.ApiCall;
import com.example.movie_management.apihelper.Caller;
import com.example.movie_management.movie.Movie;
import com.example.movie_management.search.SearchResult;
import com.example.ui.requests.AuthenticationRequest;
import com.example.ui.responses.LoginResponse;
import com.example.user_management_system.registration.RegistrationService;
import com.example.user_management_system.registration.Request;
import com.example.user_management_system.security.jwt.JWTTokenHelper;
import com.example.user_management_system.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import static com.example.user_management_system.registration.RegistrationController.isMatchingPassword;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private RegistrationService registrationService;

    private static String currentException;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException,
            NoSuchAlgorithmException {

        UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                authenticationRequest.getPassword());
        Authentication authenticatedUser = authenticationManager.authenticate(loginToken);
        SecurityContextHolder.getContext().setAuthentication(authenticatedUser);


        User user = (User) authenticatedUser.getPrincipal();

        String jwtToken = jWTTokenHelper.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);

        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> postRegistration(@RequestBody Request request) {
        if (!isMatchingPassword(request.getPassword(), request.getPasswordConfirm())) {
            throw new IllegalStateException("Passwords not matching");
        }
        if (registrationService.registration(request)) return ResponseEntity.ok("Successful");
        throw new IllegalStateException("Unsuccessful registration.");
    }

    @GetMapping(path = "/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user) {
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
        return ResponseEntity.ok(userObj);
    }


    @ExceptionHandler(IllegalStateException.class)
    public ModelAndView handleError(Exception ex) {
        ModelAndView modelAndView = new ModelAndView("redirect:/home");
        currentException = ex.getMessage();
        return modelAndView;
    }

    public static String getCurrentException() {
        return currentException;
    }

    public static void setCurrentExceptionToNull() {
        currentException = null;
    }

}
