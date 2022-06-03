package com.example.dienstleistungsSoftware.dienstleistung;

import com.example.dienstleistungsSoftware.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
  Optional<List<ServiceEntity>> findAllServiceEntityByUserEntity(Optional<UserEntity> userEntity);
  Optional<List<ServiceEntity>> findAllServiceEntityByUserEntityIsNotAndSharedTrue(Optional<UserEntity> userEntity);
}
