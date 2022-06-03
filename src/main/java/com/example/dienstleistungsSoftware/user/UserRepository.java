package com.example.dienstleistungsSoftware.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Repository
@Service
public interface UserRepository extends JpaRepository<UserEntity, Long>
{
    @Query("SELECT userEntity FROM UserEntity userEntity WHERE userEntity.email = ?1")
    Optional<UserEntity> findUserByEmail(String email);
}
