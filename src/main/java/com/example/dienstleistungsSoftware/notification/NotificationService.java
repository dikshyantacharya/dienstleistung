package com.example.dienstleistungsSoftware.notification;

import com.example.dienstleistungsSoftware.dienstleistung.ServiceEntity;
import com.example.dienstleistungsSoftware.dienstleistung.ServiceRepository;
import com.example.dienstleistungsSoftware.user.UserEntity;
import com.example.dienstleistungsSoftware.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NotificationService {
  @Autowired
NotificationRepository notificationRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  ServiceRepository serviceRepository;

  public List<NotificationDAO> getAllNotification(String userEmail) {
    List<NotificationEntity> notificationEntityList = notificationRepository.findNotificationEntityByUserReceiver(userRepository.findUserByEmail(userEmail)
      .orElse(null));
    return notificationEntityList.stream().map(notificationEntity -> {
      NotificationDAO notificationDAO = new NotificationDAO();
      notificationDAO.setId(notificationEntity.getId());
      notificationDAO.setServiceTitle(notificationEntity.getServiceEntity().getTitle());
      notificationDAO.setUserSender(notificationEntity.getUserSender()
        .getName() + " " + notificationEntity.getUserSender().getSurname());
      notificationDAO.setViewed(notificationEntity.isViewed());
      notificationDAO.setUserReceiver(notificationEntity.getUserReceiver()
        .getName() + " " + notificationEntity.getUserReceiver().getSurname());
      return notificationDAO;
    }).collect(Collectors.toList());
  }

  public void updateNotification(String userEmail) {
    notificationRepository.findNotificationEntityByUserReceiver(userRepository.findUserByEmail(userEmail)
      .orElse(null)).stream().map(notificationEntity -> {
      notificationEntity.setViewed(true);
      notificationRepository.save(notificationEntity);
      return null;
    });
  }

  public void deleteNotification(Long id) {
    notificationRepository.deleteById(id);
  }

  public void deleteAllNotification(String userEmail) {
    notificationRepository.deleteAll(notificationRepository.findNotificationEntityByUserReceiver(userRepository.findUserByEmail(userEmail)
      .orElse(null)));
  }

  public NotificationEntity createNotification(NotificationDTO notificationDTO) {
    UserEntity userEntity = Objects.requireNonNull(serviceRepository.findById(notificationDTO.getServiceId())
      .orElse(null)).getUserEntity();
    NotificationEntity notificationEntity = new NotificationEntity();
    if (userEntity != null) {
      notificationEntity.setServiceEntity(serviceRepository.findById(notificationDTO.getServiceId()).orElse(null));
      notificationEntity.setUserSender(userRepository.findUserByEmail(notificationDTO.getUserSenderEmail())
        .orElse(null));
      notificationEntity.setUserReceiver(userEntity);
      notificationEntity.setViewed(false);
      userEntity.getNotificationReceiverList().add(notificationEntity);
    }
    notificationRepository.save(notificationEntity);
    return notificationEntity;
  }

  public NotificationEntity getNotificationByUserEmailAndServiceId(String userEmail, long serviceId) {
    UserEntity userSender = userRepository.findUserByEmail(userEmail).get();
    ServiceEntity service = serviceRepository.findById(serviceId).get();
    return notificationRepository.findNotificationEntityByUserSenderAndServiceEntity(userSender, service);
  }

  public void deleteNotificationByUserEmailAndDienst(String userEmail, long serviceId) {

    NotificationEntity notificationEntity = notificationRepository.findNotificationEntityByUserSenderAndServiceEntity(userRepository.findUserByEmail(userEmail)
      .orElse(null), serviceRepository.findById(serviceId).orElse(null));
    UserEntity userSender = notificationEntity.getUserSender();
    UserEntity userReceiver = notificationEntity.getUserReceiver();
    userSender.getSenderNotificationList().remove(notificationEntity);
    userRepository.save(userSender);
    userReceiver.getNotificationReceiverList().remove(notificationEntity);
    userRepository.save(userReceiver);
  }
}
