package com.example.dienstleistungsSoftware.notification;

import com.example.dienstleistungsSoftware.notification.NotificationDAO;
import com.example.dienstleistungsSoftware.notification.NotificationDTO;
import com.example.dienstleistungsSoftware.notification.NotificationEntity;
import com.example.dienstleistungsSoftware.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Service
public class NotificationController {
  @Autowired
  private NotificationService notificationService;

  @GetMapping("/notification/{userEmail}")
  public List<NotificationDAO> getAllNotification(@PathVariable String userEmail) {
    return notificationService.getAllNotification(userEmail);
  }

  @GetMapping("/notification/{userEmail}/{serviceId}")
  public NotificationEntity getNotificationByUserEmailAndDienst(@PathVariable String userEmail, @PathVariable long serviceId) {
    return notificationService.getNotificationByUserEmailAndServiceId(userEmail, serviceId);
  }

  @PutMapping("/notification/update/{userEmail}")
  public void updateNotification(
    @PathVariable
      String userEmail) {
    notificationService.updateNotification(userEmail);
  }

  @PostMapping("/notification/create")
  public NotificationEntity createNotification(
    @RequestBody
      NotificationDTO notificationDTO) {
    System.out.println(notificationDTO.getServiceId());
    System.out.println(notificationDTO.getUserSenderEmail());
   return notificationService.createNotification(notificationDTO);
  }

  @DeleteMapping("/notification/delete/{notificationId}")
  public void deleteNotification(
    @PathVariable
      Long notificationId) {
    notificationService.deleteNotification(notificationId);
  }

  @DeleteMapping("/notification/delete/{userEmail}/{dienstId}")
  public void deleteNotificationByUserEmailAndDienst(
    @PathVariable
      String userEmail, @PathVariable
        long dienstId) {
    notificationService.deleteNotificationByUserEmailAndDienst(userEmail, dienstId);
  }
  @PostMapping("/notification/{test}")
  public void test(@PathVariable String test) {
    System.out.println(test);
  }
}
