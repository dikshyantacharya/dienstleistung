package com.example.dienstleistungsSoftware.notification;

import com.example.dienstleistungsSoftware.dienstleistung.ServiceEntity;
import com.example.dienstleistungsSoftware.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class NotificationEntity {

  @Id
  @SequenceGenerator(
    name = "notification_sequence",
    sequenceName = "notification_sequence",
    allocationSize = 1
  )

  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "notification_sequence"
  )

  private Long id;
  private boolean viewed;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_sender_id", referencedColumnName = "id")
  @JsonIgnore
  private UserEntity userSender;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_receiver_id", referencedColumnName = "id")
  @JsonIgnore
  private UserEntity userReceiver;

  @ManyToOne
  @JoinColumn(name = "service_id", referencedColumnName = "id")
  @JsonIgnore
  private ServiceEntity serviceEntity;
}
