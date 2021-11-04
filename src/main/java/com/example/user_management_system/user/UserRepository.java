package com.example.user_management_system.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.nickname = :nick")
    Optional<User> findByNickname(@Param("nick") String nickname);
}
