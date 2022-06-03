package com.example.dienstleistungsSoftware.dienstleistung;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceDTO {

  private String userEmail;
  private String title;
  private String description;
  private Integer pricing;
  private Boolean shared;
}
