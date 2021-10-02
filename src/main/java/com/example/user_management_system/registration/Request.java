package com.example.user_management_system.registration;

import lombok.Data;

@Data
public class Request {

    private final String email;
    private final String firstName;
    private final String lastName;
    private final String password;
    private final String password_confirm;

}
