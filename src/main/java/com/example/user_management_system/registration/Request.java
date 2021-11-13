package com.example.user_management_system.registration;

import lombok.Data;

import java.io.Serializable;

@Data
public class Request implements Serializable {

    private final String nickName;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final String password;
    private final String passwordConfirm;

}
