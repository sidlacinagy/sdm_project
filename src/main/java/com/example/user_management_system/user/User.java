package com.example.user_management_system.user;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;

@Data
@NoArgsConstructor
@Entity
public class User implements UserDetails {

    @Id
    @NotNull
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private boolean enabled = false;
    private String registerDate;
    @Column(unique=true)
    private String nickname;
    private int watchtime = 0;

    public User(String nickname, String firstName, String lastName, String email, String password) {
        this.nickname = nickname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.registerDate = LocalDateTime.now().format(formatter);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void incrementWatchtime(int runtime){
        watchtime+=runtime;
    }

}
