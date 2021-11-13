package com.example.ui.controllers;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import com.example.ui.requests.AuthenticationRequest;
import com.example.ui.requests.UserInfo;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {


        UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword());
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
        System.out.println("EEEEEEEEEEEEEEEEEEEEEEEEE");
        if (!isMatchingPassword(request.getPassword(), request.getPasswordConfirm())) {
            throw new IllegalStateException("Passwords not matching");
        }
        if (registrationService.registration(request)) return ResponseEntity.ok("Successful");
        throw new IllegalStateException("Unsuccessful registration.");
    }


}
