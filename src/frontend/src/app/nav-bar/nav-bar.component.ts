import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../common/httpRequest/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../common/dialog.service';
import {User} from '../common/object/user';
import {ToastrService} from 'ngx-toastr';
import {DienstleistungService} from '../common/httpRequest/dienstleistung.service';
import {Dienstleistung} from '../common/object/dienstleistung';
import {Observable} from 'rxjs';
import {NotificationService} from '../common/httpRequest/notification.service';
import {Notification} from "../common/object/notification";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  // user variables
  user: Observable<User> | undefined;
  userName: string = '';
  userSurname: string = '';
  userEmail: string = '';
  oldpassword: string = '';
  newpassword: string = '';


  // forms
  deleteUserForm: FormGroup;
  updateUserForm: FormGroup;
  dienstcreateForm: FormGroup;
  changePasswordForm: FormGroup;

  //dienstleistungs variables

  diesntleistungShared: boolean = false;

  // dienstleistungs list
  myDienstleistungList: Dienstleistung[] = [];
  dienstleistungList: Dienstleistung[] = [];

  //boolean states
  isShared: boolean = false;
  isSharedThroughShare: boolean = false;
  deleteClicked: boolean = false;

  notification: Notification | undefined;
  notificationList: Notification[] = [];
  totalNotification: number | undefined = 0;

  constructor(
    private userService: UserService,
    private dienstleistungService: DienstleistungService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    // Delete User
    this.deleteUserForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    // Update User
    this.updateUserForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
    });

    this.changePasswordForm = new FormGroup({
      "oldpassword": new FormControl(),
      "newpassword": new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(8)
      ]))
    });

    //create Dienstleistung
    this.dienstcreateForm = new FormGroup({
      title: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          //  Validators.minLength(5)
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(30)
        ])
      ),
      pricing: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(1)
        ])
      ),
      userEmail: new FormControl(),
      shared: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userEmail = params['userEmail'];
    });
    console.log('user email is ' + this.userEmail);
    this.dienstcreateForm.controls['userEmail'].setValue(this.userEmail);
    this.user = this.userService.getUser(this.userEmail);
    this.user?.forEach((user) => {
      this.userName = user.name;
      this.userSurname = user.surname;
    });

    if (
      localStorage.getItem('userEmail') !=
      this.route.snapshot.params['userEmail']
    ) {
      this.router.navigate(['/login']);
    }

    this.notificationService.getAllNotification(this.userEmail).subscribe(
      (notificationList) => {
        this.notificationList = notificationList;
        console.log(this.notificationList);
        this.totalNotification = notificationList.length;
      }
    )
    /*
      this.notificationService
        .getAllNotification(this.userEmail)
        .subscribe(data => {
          this.notificationList = Object.assign([], data);
          console.log("this is the ans");
          console.log(this.notificationList);
          console.log("this was the ans");

          this.totalNotification = data.length;
        }, error => {
          console.log(error);
        });


       this.dienstleistungService.getAllJobs(this.userEmail).subscribe({
        next: (response: Dienstleistung[]) => {
          this.dienstleistungList = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
       */
  }

  open(action: any) {
    this.dialogService.open(action);
  }

  logout() {
    this.router.navigate(['login']);
  }

  onSubmit(mode: String) {
    if (mode === 'deleteUser') {
      if (confirm('Unwiderruflich löschen?')) {
        console.log(this.deleteUserForm.value);
        this.userService.deleteUser(this.deleteUserForm.value).subscribe(
          (data) => {
            console.log(data);
            this.deleteUserForm.reset();
            this.logout();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

    if (mode === 'updateUser') {
      this.userService
        .updateUser(this.userEmail, this.updateUserForm.value)
        .subscribe(
          (data) => {
            console.log(data);
            this.toastr.success('Erfolgreich aktualisiert');
          },
          (error) => {
            console.log(error);
            this.toastr.error('Fehler beim Aktualisieren');
          }
        );
    }

    if (mode == "changePassword") {
      this.userService.changePassword(this.userEmail, this.changePasswordForm.value).subscribe(data => {
        console.log(data);
        this.toastr.success("Erfolgreich aktualisiert");
      }, error => {
        console.log(error);
        this.toastr.error("Fehler beim Aktualisieren");
      });
    }

    if (mode === 'createDLS') {
      this.dienstcreateForm.controls['shared'].setValue(this.isShared);
      this.dienstleistungService
        .createDienstleistung(this.dienstcreateForm.value)
        .subscribe(
          (data) => {
            console.log('inside the method');
            console.log(data);
            this.dienstcreateForm.reset();
            this.toastr.success(
              'It will not take long for people to notice!',
              'Dienstleistung created!'
            );
            location.reload();
            this.isShared = false;
          },
          (error) => {
            console.log(error);
            this.toastr.error(
              'Irgendwas ist schief gelaufen',
              'Hmm hat nicht funktioniert'
            );
          }
        );
    }

    if (mode === 'showMyDLS') {
      this.router.navigate([this.userEmail, 'myDienstleistungen']);
    }
  }

  iconClicked() {
    this.router.navigate([this.userEmail, 'home']);
  }

  notificationIconClicked() {
    this.dialogService.open("notificationIcon");
  }
}
