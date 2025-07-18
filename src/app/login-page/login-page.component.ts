import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  password: string = '';
  formError: string = '';
  showPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private adminservice: AdminService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.formError = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please enter valid Email and Password', 'Warning');
      this.formError = 'Please enter valid Email and Password.';
      return;
    }

    this.adminservice.postadminlogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res, res.logindata, res.token, 'login data');

        localStorage.setItem('admin', JSON.stringify(res.logindata));
        localStorage.setItem('token', res.token);

        this.toastr.success('Login successful!', 'Success', {
          positionClass: 'toast-top-center',
        });

        this.router.navigateByUrl('dshboard/home');
      },
      error: () => {
        this.toastr.error(
          'Login failed. Please check your credentials.',
          'Error'
        );
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
