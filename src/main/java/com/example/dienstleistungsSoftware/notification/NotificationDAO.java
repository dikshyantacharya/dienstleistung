package com.example.dienstleistungsSoftware.notification;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDAO {
  private Long id;
  private String userSender;
  private String userReceiver;
  private String serviceTitle;
  private boolean viewed;
}
