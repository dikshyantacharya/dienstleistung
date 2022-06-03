package com.example.dienstleistungsSoftware.dienstleistung;

import com.example.dienstleistungsSoftware.user.UserEntity;
import com.example.dienstleistungsSoftware.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {
  private final ServiceRepository serviceRepository;

  @Autowired
  public ServiceService(ServiceRepository serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  @Autowired
  UserRepository userRepository;

  public Optional<List<ServiceEntity>> getAllMyService(String userEmail) {
    Optional<UserEntity> user = Optional.of(userRepository.findUserByEmail(userEmail).get());
    return serviceRepository.findAllServiceEntityByUserEntity(user);
  }

  public Optional<List<ServiceEntity>> getAllOtherService(String userEmail) {
    Optional<UserEntity> user = Optional.of(userRepository.findUserByEmail(userEmail).get());
    return serviceRepository.findAllServiceEntityByUserEntityIsNotAndSharedTrue(user);
  }

  public ServiceEntity createNewService(ServiceDTO serviceDTO) {
    Optional<UserEntity> user = userRepository.findUserByEmail(serviceDTO.getUserEmail());
    ServiceEntity serviceEntity = new ServiceEntity();
    if (user.isPresent()) {
      serviceEntity.setTitle(serviceDTO.getTitle());
      serviceEntity.setDescription(serviceDTO.getDescription());
      serviceEntity.setPricing(serviceDTO.getPricing());
      serviceEntity.setShared(serviceDTO.getShared());
      serviceEntity.setUserEntity(user.get());
      user.get().getServiceEntityList().add(serviceEntity);
    }
    serviceRepository.save(serviceEntity);
    return serviceEntity;
  }

  public void updateService(ServiceEntity serviceEntity) {
    Optional<ServiceEntity> dienstleistung = serviceRepository.findById(serviceEntity.getId());
    if (dienstleistung.isPresent()) {
      dienstleistung.get().setTitle(serviceEntity.getTitle());
      dienstleistung.get().setDescription(serviceEntity.getDescription());
      dienstleistung.get().setPricing(serviceEntity.getPricing());
      dienstleistung.get().setShared(serviceEntity.getShared());
      serviceRepository.save(dienstleistung.get());
    }
  }

  public void deleteServiceById(Long id) {
    Optional<ServiceEntity> serviceEntity = serviceRepository.findById(id);
    if (serviceEntity.isPresent()) {
      UserEntity userEntity = serviceEntity.get().getUserEntity();
      userEntity.getServiceEntityList().remove(serviceEntity.get());
      userRepository.save(userEntity);
      //    serviceRepository.deleteById(id);
    }
  }

  /**
   * Methode liefert dir Job mit bestimmter ID
   *
   * @param id
   * @return
   */

  public Optional<ServiceEntity> getServiceById(Long id) {
    return serviceRepository.findById(id);
  }

  public Optional<UserEntity> getUserByServiceId(Long serviceId) {
    Optional<ServiceEntity> serviceEntity = serviceRepository.findById(serviceId);
    assert serviceEntity.orElse(null) != null;
    System.out.println(serviceEntity.orElse(null).getUserEntity().getEmail());
    return serviceEntity.map(ServiceEntity::getUserEntity);
  }
}
