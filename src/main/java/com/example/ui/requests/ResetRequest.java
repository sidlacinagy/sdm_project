package com.example.ui.requests;

import lombok.Getter;

@Getter
public class ResetRequest {

    String token;
    String password;
    String password_confirm;

}
