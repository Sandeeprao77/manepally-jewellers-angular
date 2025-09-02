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
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-view-invoice',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.css',
})
export class ViewInvoiceComponent implements OnInit {
  invoicedata: any[] = [];
  searchTerm: string = '';
  editForm!: FormGroup;
  iid: any;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private invoiceservice: InvoiceService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      branch: ['', Validators.required],
      customer_name: ['', Validators.required],
      exchange: ['', Validators.required],
      createdAt: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.invoiceservice.invoicelist().subscribe((res: any) => {
      this.invoicedata = res.pro;
    });
  }

  filteredInvoices() {
    if (!this.searchTerm) return this.invoicedata;

    const term = this.searchTerm.toLowerCase();
    return this.invoicedata.filter((inv) =>
      Object.values(inv).some((val) =>
        val?.toString().toLowerCase().includes(term)
      )
    );
  }

  editInvoice(data: any) {
    this.iid = data._id;
    this.editForm.patchValue({
      branch: data.branch,
      customer_name: data.customer_name,
      exchange: data.exchange,
      createdAt: data.createdAt,
      status: data.status,
    });
  }

  updateInvoice() {
    this.invoiceservice.updateinvoice(this.iid, this.editForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Invoice updated successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
      },
      error: (err: any) => {
        this.toastr.error('Failed to update invoice.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }

  deleteinvoice(id: string) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceservice.deleteinvoice(id).subscribe({
        next: (res: any) => {
          this.toastr.success('Invoice deleted successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          this.invoicedata = this.invoicedata.filter((x) => x._id !== id);
        },
        error: (err: any) => {
          this.toastr.error('Failed to delete invoice.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
    }
  }

  isCreatingInvoice(): boolean {
    return this.router.url.includes('view-invoice/invoice');
  }
  isInvoiceDetails():boolean{
    return this.router.url.includes('')
  }
}
