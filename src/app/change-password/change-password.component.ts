import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  passwordForm!:FormGroup;
form: any;
  constructor(private fb:FormBuilder,private adminservice:AdminService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
       password: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  onChangePassword() {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.adminservice.changePassword({ currentPassword, newPassword }).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully!', 'Success');
        this.passwordForm.reset();
      },
      error: (err: { error: { message: any; }; }) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Failed to change password.', 'Error');
      },
    });
  }

}
