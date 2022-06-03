package com.example.dienstleistungsSoftware.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
  private String name;
  private String surname;

  public UserDTO(String name, String surname) {

    this.name = name;
    this.surname = surname;

  }
}


