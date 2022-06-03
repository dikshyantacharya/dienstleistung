import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../common/httpRequest/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../common/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  userEmail: String = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          //  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(8)
        ])
      ),
    });
    this.registrationForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),

      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(8)
        ])
      ),
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  open(registration: any) {
    this.dialogService.open(registration);
  }

  onSubmit(mode: string) {
    if (mode === 'registration') {
      console.log(this.registrationForm.value);
      this.userService.createUser(this.registrationForm.value).subscribe(
        (data) => {
          console.log(data);
          this.registrationForm.reset();
          this.toastr.success(
            'Thank you for being a member!',
            'Registration Successful!'
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error('Email already taken', 'Registration Failed!');
        }
      );
    } else if (mode === 'login') {
      console.log(this.loginForm.value);
      this.userService.getLoginValidation(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          this.userEmail = this.loginForm.value.email;
          this.loggedIn = data;
          localStorage.setItem('userEmail', `${this.userEmail}`);
          this.loginForm.reset();
          if (this.loggedIn) {
            this.toastr.success('', 'Login successful!');
            this.router.navigate([this.userEmail, 'home']);
          } else {
            this.toastr.error('Email or Password wrong!', 'Login Failed!');
          }
        },
        (error) => {
          this.toastr.error('Internal Server Error', 'Login Failed!');
          console.log(error);
          this.loggedIn = error;
        }
      );
    }
  }

  onAboutUsClicked() {
    this.router.navigate(['about-us']);
  }
}
