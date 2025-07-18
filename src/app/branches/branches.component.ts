import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branches',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css',
})
export class BranchesComponent implements OnInit {
  branchForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private branchservice: BranchService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      branch_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });
    console.log('Saving branch data:', this.branchForm.value);

  }
  save() {
    if (this.branchForm.invalid) {
      this.toastr.warning('Please fill all required fields.', 'Warning', {
        positionClass: 'toast-top-center',
      });
      return;
    }
    this.branchservice.savebranch(this.branchForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Task added successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
      },
      error: (err: any) => {
        this.toastr.error('Failed to add task.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }
}
