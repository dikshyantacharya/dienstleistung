package com.example.dienstleistungsSoftware.notification;

import com.example.dienstleistungsSoftware.dienstleistung.ServiceEntity;
import com.example.dienstleistungsSoftware.notification.NotificationEntity;
import com.example.dienstleistungsSoftware.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
@Service
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
  List<NotificationEntity> findNotificationEntityByUserReceiver(UserEntity userEntity);

  NotificationEntity findNotificationEntityByUserSenderAndServiceEntity(UserEntity userSender, ServiceEntity service);

  void deleteNotificationEntityByUserSenderAndServiceEntity(UserEntity userSender, ServiceEntity service);
}
