package com.example.dienstleistungsSoftware.dienstleistung;

import com.example.dienstleistungsSoftware.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping
@Service
public class ServiceController {

  private final ServiceService serviceService;

  @Autowired
  public ServiceController(ServiceService serviceService) {
    this.serviceService = serviceService;
  }

  @GetMapping(path = "/job/{id}")
  public Optional<ServiceEntity> getServiceById(
    @PathVariable
      Long id) {
    return serviceService.getServiceById(id);
  }

  @GetMapping(path = "/service/user/{serviceId}")
  public Optional<UserEntity> getUserByServiceId(
    @PathVariable
      Long serviceId) {
    return serviceService.getUserByServiceId(serviceId);
  }

  @GetMapping(path = "service/my/{userEmail}")
  public Optional<List<ServiceEntity>> getAllMyService(
    @PathVariable
      String userEmail) {
    return serviceService.getAllMyService(userEmail);
  }

  @GetMapping(path = "/service/other/{userEmail}")
  public Optional<List<ServiceEntity>> getAllOtherService(
    @PathVariable
      String userEmail) {
    return serviceService.getAllOtherService(userEmail);
  }

  @PostMapping(path = "/service/create")
  public ServiceEntity createNewService(
    @RequestBody
      ServiceDTO serviceDTO) {
    return serviceService.createNewService(serviceDTO);
  }

  @PutMapping(path = "/service/update")
  public void updateService(
    @RequestBody
      ServiceEntity serviceEntity) {
    serviceService.updateService(serviceEntity);
  }

  @DeleteMapping(path = "/service/delete/{id}")
  public void deleteServiceById(
    @PathVariable
      Long id) {
    serviceService.deleteServiceById(id);
  }

}
