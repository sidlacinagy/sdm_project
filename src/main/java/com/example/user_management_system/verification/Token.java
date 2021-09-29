package com.example.user_management_system.verification;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@Data
@Entity
public class Token {

    @Id
    private String token;

    private LocalDateTime expiresAt;

    private long userId;

    public Token(long userId){
        this.userId=userId;
        this.token=UUID.randomUUID().toString();
        this.expiresAt=LocalDateTime.now().plusMinutes(15);
    }

}
