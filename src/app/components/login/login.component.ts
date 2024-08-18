import { LoginService } from './../../services/login.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from './../../models/login';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userlogged!: Login;
  form!: FormGroup;
  validationNumber: number = 4;
  private apiUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: [
        '',
        [Validators.minLength(this.validationNumber), Validators.required],
      ],
      reqId: [-11],
    });
  }
  onLogin() {
    if (this.form.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    this.http.post(this.apiUrl, this.form.value).subscribe(
      (u: any) => {
        if (u.isSucceeded) {
          alert('login successfully');
          localStorage.setItem('token', u.data.token);
          console.log('token', u.data.token);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(u.error);
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('There was an error during the login process.');
      }
    );
    // console.log('before service');
    // this.loginService.login(this.form.value).subscribe((response) => {
    //   if (response.isSucceeded) {
    //     localStorage.setItem('token', response.data.token);
    //     alert('login successfully');
    //     this.router.navigateByUrl('/dashboard');
    //   } else {
    //     alert(response.error);
    //   }
    // });
    console.log('Login Page', this.form.value);
  }
}
