import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../common/object/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dienstleistung } from '../common/object/dienstleistung';
import { UserService } from '../common/httpRequest/user.service';
import { DienstleistungService } from '../common/httpRequest/dienstleistung.service';
import { DialogService } from '../common/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dienstleistung',
  templateUrl: './dienstleistung.component.html',
  styleUrls: ['./dienstleistung.component.css'],
})
export class DienstleistungComponent implements OnInit {
  // user variables
  user: Observable<User> | undefined;
  userName: string = '';
  userSurname: string = '';
  userEmail: string = '';

  dienstUpdateForm: FormGroup;

  //dienstleistungs variables

  dienstleistungPricing: string = '';
  dienstleistungTitle: string = '';
  dienstleistungDescription: string = '';
  diesntleistungShared: boolean = false;

  // dienstleistungs list
  myDienstleistungList: Dienstleistung[] = [];
  dienstleistungList: Dienstleistung[] = [];

  //boolean states
  isShared: boolean = false;
  deleteClicked: boolean = false;

  constructor(
    private userService: UserService,
    private dienstleistungService: DienstleistungService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    //update Dienstleistung

    this.dienstUpdateForm = new FormGroup({
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
      userEmail: new FormControl(''),
      id: new FormControl(),
      shared: new FormControl(),
    });
    this.isShared = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userEmail = params['userEmail'];
    });
    console.log('user email is ' + this.userEmail);
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
    this.getMyJobs();
  }

  open(action: any) {
    this.dialogService.open(action);
  }

  getMyJobs(): void {
    this.dienstleistungService.getMyJobs(this.userEmail).subscribe({
      next: (response: Dienstleistung[]) => {
        this.myDienstleistungList = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onSubmit(mode: String) {
    if (mode == 'updateDLS') {
      this.dienstUpdateForm.controls['shared'].setValue(
        this.diesntleistungShared
      );
      this.dienstleistungService
        .updateDienstleistung(this.dienstUpdateForm.value)
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
  }

  onDienstClicked(dienstleistung: Dienstleistung) {
    this.dienstleistungTitle = dienstleistung.title;
    this.dienstleistungPricing = dienstleistung.pricing;
    this.dienstleistungDescription = dienstleistung.description;
    this.diesntleistungShared = dienstleistung.shared;
    this.dienstUpdateForm.controls['id'].setValue(dienstleistung.id);
  }

  onDelete(id: number) {
    this.dienstleistungService.deleteDienstleistung(id).subscribe(
      (data) => {
        prompt('dienstID deleted' + id);
        console.log(data);
        this.toastr.success('Erfolgreich gelöscht');
        location.reload();
      },
      (error) => {
        console.log(error);
        this.toastr.error('Fehler beim Löschen');
      }
    );
  }

  onShare(dienstleistung: Dienstleistung) {
    this.dienstUpdateForm.controls['shared'].setValue(!dienstleistung.shared);
    this.dienstUpdateForm.controls['id'].setValue(dienstleistung.id);
    this.dienstUpdateForm.controls['title'].setValue(dienstleistung.title);
    this.dienstUpdateForm.controls['pricing'].setValue(dienstleistung.pricing);
    this.dienstUpdateForm.controls['description'].setValue(
      dienstleistung.description
    );
    this.dienstleistungService
      .updateDienstleistung(this.dienstUpdateForm.value)
      .subscribe(
        (data) => {
          console.log(data);
          if (dienstleistung.shared) {
            this.toastr.success('Erfolgreich unshared');
          } else if (!dienstleistung.shared) {
            this.toastr.success('Erfolgreich geteilt');
          }
          setTimeout(() => {
            location.reload();
          }, 500);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Fehler beim Aktualisieren');
        }
      );
  }
  //test
}
