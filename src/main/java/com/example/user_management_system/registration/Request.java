package com.example.user_management_system.registration;

import lombok.Data;

import java.io.Serializable;
import java.lang.reflect.Field;

@Data
public class Request implements Serializable {

    private final String nickname;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final String password;
    private final String passwordConfirm;

    public boolean checkAnyNull() throws IllegalAccessException {
        for (Field f : getClass().getDeclaredFields())
            if ("".equals(f.get(this)))
                return true;
        return false;
    }

}
