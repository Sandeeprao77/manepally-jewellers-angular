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
import { PurchaseService } from '../purchase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-purchase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './view-purchase.component.html',
  styleUrl: './view-purchase.component.css',
})
export class ViewPurchaseComponent implements OnInit {
  purchasedata: any[] = [];
  editForm!: FormGroup;
  pid: any;
  
  searchTerm: string = ''; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private purchaseservice: PurchaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      branch: ['', Validators.required],
      customer_name: ['', Validators.required],
      refer_invoice_number: ['', Validators.required],
      createdAt: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.purchaseservice.purchaselist().subscribe((res: any) => {
      console.log(res.pur, 'purchases');
      this.purchasedata = res.pur;
    });
  }

  editPurchase(data: any) {
    this.pid = data._id;
    this.editForm.patchValue({
      branch: data.branch,
      customer_name: data.customer_name,
      refer_invoice_number: data.refer_invoice_number,
      createdAt: data.createdAt,
      status: data.status,
    });
  }

  updatePurchase() {
    this.purchaseservice.updatepurchase(this.pid, this.editForm.value).subscribe({
      next: () => {
        this.toastr.success('Purchase updated successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
      },
      error: (err: any) => {
        this.toastr.error('Failed to update purchase.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }

  deletePurchase(id: string) {
    if (confirm('Are you sure you want to delete this purchase?')) {
      this.purchaseservice.deletepurchase(id).subscribe({
        next: () => {
          this.toastr.success('Purchase deleted successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          // Remove from local array
          this.purchasedata = this.purchasedata.filter(p => p._id !== id);
        },
        error: (err: any) => {
          this.toastr.error('Failed to delete purchase.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
    }
  }

  isCreatingPurchase(): boolean {
    return this.router.url.includes('view-purchase/purchase');
  }

  filteredPurchases(): any[] {
    if (!this.searchTerm) return this.purchasedata;

    const term = this.searchTerm.toLowerCase();
    return this.purchasedata.filter(p =>
      p.branch?.toLowerCase().includes(term) ||
      p.customer_name?.toLowerCase().includes(term) ||
      p.refer_invoice_number?.toLowerCase().includes(term) ||
      p.status?.toLowerCase().includes(term)
    );
  }
}
