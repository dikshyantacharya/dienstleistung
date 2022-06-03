import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/object/user';
import { Dienstleistung } from '../common/object/dienstleistung';
import { UserService } from '../common/httpRequest/user.service';
import { DienstleistungService } from '../common/httpRequest/dienstleistung.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // user variables
  user: Observable<User> | undefined;
  userName: string = '';
  userSurname: string = '';
  userEmail: string = '';

  //dienstleistungs variables

  dienstleistungPricing: string = '';
  dienstleistungTitle: string = '';
  diesntleistungShared: boolean = false;

  // dienstleistungs list
  myDienstleistungList: Dienstleistung[] = [];
  dienstleistungList: Dienstleistung[] = [];

  //boolean states
  isShared: boolean = false;
  showMyDLSClicked: boolean = false;
  isSharedThroughShare: boolean = false;
  deleteClicked: boolean = false;

  constructor(
    private userService: UserService,
    private dienstleistungService: DienstleistungService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute
  ) {}

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
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.dienstleistungService.getAllJobs(this.userEmail).subscribe({
      next: (response: Dienstleistung[]) => {
        this.dienstleistungList = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  dienstClicked(dienstId: number) {
    localStorage.setItem('userEmail', `${this.userEmail}`);
    localStorage.setItem('dienstId', `${dienstId}`);
    this.router.navigate([this.userEmail, dienstId, 'detail']);
  }
}
