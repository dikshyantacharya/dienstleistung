package com.example.dienstleistungsSoftware.dienstleistung;

import com.example.dienstleistungsSoftware.notification.NotificationEntity;
import com.example.dienstleistungsSoftware.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity(name = "dienstleistungs_entity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceEntity {
  @Id
  @SequenceGenerator(
    name = "dienstleistungs_sequence",
    sequenceName = "dienstleistungs_sequence",
    allocationSize = 1)
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "dienstleistungs_sequence"
  )
  @Column(nullable = false, updatable = false)
  private Long id;
  private String title;
  private String description;
  private Integer pricing;
  private Boolean shared;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_entity_id", referencedColumnName = "id")
  @JsonIgnore
  private UserEntity userEntity;

  @OneToMany(mappedBy = "serviceEntity", fetch = FetchType.EAGER, orphanRemoval = true)
  private List<NotificationEntity> notificationEntityList;

}
