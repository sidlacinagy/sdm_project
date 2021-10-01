package com.example.user_management_system.user;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@Entity
public class User  {

    @Id
    @NotNull
    private String email;

    private String firstName;
    private String lastName;
    private String password;
    private boolean activated=false;

    public User(String firstName, String lastName, String email, String password){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
    }



}
