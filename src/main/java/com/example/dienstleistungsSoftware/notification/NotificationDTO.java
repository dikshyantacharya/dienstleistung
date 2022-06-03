package com.example.dienstleistungsSoftware.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NotificationDTO {
  private String userSenderEmail;
  private long serviceId;
  private boolean viewed;
}
