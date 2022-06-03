package com.example.dienstleistungsSoftware.user;


import com.example.dienstleistungsSoftware.dienstleistung.ServiceEntity;
import com.example.dienstleistungsSoftware.notification.NotificationEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table
public class UserEntity {
  @Id
  @SequenceGenerator(
    name = "user_sequence",
    sequenceName = "user_sequence",
    allocationSize = 1
  )

  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "user_sequence"
  )

  private Long id;
  private String name;
  private String surname;
  private String email;
  private String password;

  @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
  private List<ServiceEntity> serviceEntityList;

  @OneToMany(mappedBy = "userReceiver", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
  private List<NotificationEntity> notificationReceiverList;

  @OneToMany(mappedBy = "userSender", fetch = FetchType.EAGER, orphanRemoval = true)
  private List<NotificationEntity> senderNotificationList;

  public UserEntity() {}

  public UserEntity(String name, String surname, String email, String password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

}
