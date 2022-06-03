import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dienstleistung} from '../common/object/dienstleistung';
import {DienstleistungService} from '../common/httpRequest/dienstleistung.service';
import {Observable} from 'rxjs';
import {User} from '../common/object/user';
import {NotificationCreate} from '../common/object/notificationCreate';
import {NotificationService} from '../common/httpRequest/notification.service';
import {Notification} from "../common/object/notification";

@Component({
  selector: 'app-dienst-detail',
  templateUrl: './dienst-detail.component.html',
  styleUrls: ['./dienst-detail.component.css'],
})
export class DienstDetailComponent implements OnInit {
  private dienstId: any;
  dienstleistungTitle = '';
  dienstleistungPricing = '';
  dienstleistungDescription = '';
  notificationCreate: NotificationCreate | undefined;
  notificationServiceId: number = 0;
  notificationViewed: boolean = false;
  notification: Notification | undefined;

  userEmail: string = '';

  dienstOwner: User | undefined;
  dienstOwnerName = '';
  dienstOwnerEmail = '';
  dienstOwnerSurname = '';
  test: string = '';
  accepted: boolean = false;

  dienstleistung: Observable<Dienstleistung> | undefined;

  constructor(
    private route: ActivatedRoute,
    private dienstService: DienstleistungService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.dienstId = params['dienstId'];
    });

    this.route.params.subscribe((params) => {
      this.userEmail = params['userEmail'];
    });
    this.getDienstleistung(this.dienstId);

    this.dienstleistung?.subscribe((dienstleistung) => {
      console.log(dienstleistung.title);
      console.log(dienstleistung.pricing);
      console.log(dienstleistung.description);
      console.log(dienstleistung.shared);
    });
    this.test = JSON.stringify(this.dienstleistung);
    this.getUserFromServiceId(this.dienstId);
    this.notificationService.getNotificationByUserAndService(this.userEmail, this.dienstId).subscribe((notification) => {
      this.notification = notification
      console.log("notification  is " + notification);
      if (notification != null) {
        this.accepted = true;
      }
    });

  }

  getDienstleistung(dienstId: number) {
    this.dienstleistung = this.dienstService.getDienstleistungById(dienstId);
    this.dienstleistung.subscribe((dienstleistung) => {
      this.dienstleistungTitle = dienstleistung.title;
      this.dienstleistungPricing = dienstleistung.pricing;
      this.dienstleistungDescription = dienstleistung.description;
    });
  }

  getUserFromServiceId(serviceId: number) {
    this.dienstService.getUserByServiceId(serviceId).subscribe((user) => {
      this.dienstOwner = user;
      this.dienstOwnerName = user.name;
      this.dienstOwnerEmail = user.email;
      this.dienstOwnerSurname = user.surname;
    });
  }

  onAcceptClicked() {
    this.notificationService
      .createNotification({
        userSenderEmail: this.userEmail,
        serviceId: this.dienstId,
        viewed: false,
      })
      .subscribe(
        data => {
          console.log(data);
          location.reload();
        },
        error => {
          console.log(error);
        }
      );

  }

  onUnacceptClicked() {
    this.notificationService
      .deleteNotification(
        this.userEmail,
        this.dienstId
      )
      .subscribe(
        data => {
          console.log(data);
          location.reload()
        },
        error => {
          console.log(error);
        }
      );
  }

}
