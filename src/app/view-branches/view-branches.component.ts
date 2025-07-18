import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-view-branches',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './view-branches.component.html',
  styleUrl: './view-branches.component.css',
})
export class ViewBranchesComponent implements OnInit {
  editForm!: FormGroup;
  branchesdata: any[] = [];
  searchTerm: string = '';
  bid: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private branchservice: BranchService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      branch_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });

    this.branchservice.branchlist().subscribe((res: any) => {
      console.log(res.allbranch, 'branches');
      this.branchesdata = res.allbranch;
    });
  }

  filteredBranches() {
    if (!this.searchTerm) return this.branchesdata;

    const term = this.searchTerm.toLowerCase();
    return this.branchesdata.filter((branch) =>
      Object.values(branch).some((val) =>
        val?.toString().toLowerCase().includes(term)
      )
    );
  }

  editBranches(data: any) {
    this.bid = data._id;
    this.editForm.patchValue({
      branch_name: data.branch_name,
      phone_number: data.phone_number,
      email: data.email,
      address: data.address,
    });
  }

  updatebranch() {
    this.branchservice.updatebranch(this.bid, this.editForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Branch updated successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
      },
      error: (err: any) => {
        this.toastr.error('Failed to update branch.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }

  deletebranch(id: string) {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.branchservice.deletebranch(id).subscribe({
        next: (res: any) => {
          this.toastr.success('Branch deleted successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          this.branchesdata = this.branchesdata.filter((x) => x._id !== id);
        },
        error: (err: any) => {
          this.toastr.error('Failed to delete branch.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
    }
  }

  isCreatingBranches(): boolean {
    return this.router.url.includes('view-branches/branches');
  }
}
