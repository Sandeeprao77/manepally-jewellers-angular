import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PurchaseService } from '../purchase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent implements OnInit {
  invoiceForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private purchaseservice: PurchaseService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      branch: ['', Validators.required],
      refer_invoice_number: ['', Validators.required],
      customer_name: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pan_number: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['', Validators.required],
      products: this.fb.array([this.createProduct()]),
    });
  }
 save(): void {
  if (this.invoiceForm.invalid) {
    console.log(this.invoiceForm);
  console.log(this.invoiceForm.get('products'));
    this.toastr.warning('Please fill all required fields.', 'Warning', {
      positionClass: 'toast-top-center',
    });
    this.invoiceForm.markAllAsTouched(); 
    return;
  }

  this.purchaseservice.savepurchase(this.invoiceForm.value).subscribe({
    next: (res: any) => {
      this.toastr.success('Purchase saved successfully!', 'Success', {
        positionClass: 'toast-top-center',
      });
      this.invoiceForm.reset(); 
    },
    error: (err: any) => {
      const errorMsg = err?.error?.message || 'Failed to save purchase.';
      this.toastr.error(errorMsg, 'Error', {
        positionClass: 'toast-top-center',
      });
      console.error('Error saving purchase:', err);
    },
  });
}

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }
  createProduct(): FormGroup {
    return this.fb.group({
      hsn: ['',Validators.required],
      description: ['',Validators.required],
      qty: ['',Validators.required],
      gross_wt: ['',Validators.required],
      calc_wt: ['',Validators.required],
      rate: ['',Validators.required],
      amount: ['',Validators.required],
    });
  }
  addProduct(): void {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.invoiceForm.value);
  }
}
