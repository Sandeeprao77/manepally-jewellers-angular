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
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
})
export class InvoicesComponent implements OnInit {
  invoiceForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private invoiceservice: InvoiceService
  ) {}
  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      branch: ['', Validators.required],
      phone: ['', Validators.required],
      customer_name: ['', Validators.required],
      email: ['', Validators.required],
      exchange: ['', Validators.required],
      notes: ['', Validators.required],
      products: this.fb.array([this.createProduct()]),
    });
  }

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      hsn: ['', Validators.required],
      description: ['', Validators.required],
      qty: ['', Validators.required],
      grossWt: ['', Validators.required],
      calcWt: ['', Validators.required],
      rate: ['', Validators.required],
      amount: ['', Validators.required],
      purity: ['', Validators.required],
      value: ['', Validators.required],
      margin: ['', Validators.required],
      subItems: this.fb.array([this.createSubItem()]),
    });
  }

  createSubItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      rate: ['', Validators.required],
    });
  }

  addProduct(): void {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  getSubItems(productIndex: number): FormArray {
    return this.products.at(productIndex).get('subItems') as FormArray;
  }

  addSubItem(productIndex: number): void {
    this.getSubItems(productIndex).push(this.createSubItem());
  }

  removeSubItem(productIndex: number, subIndex: number): void {
    this.getSubItems(productIndex).removeAt(subIndex);
  }

  onSubmit(): void {
    console.log(this.invoiceForm.value);
  }
  save() {
    if (this.invoiceForm.invalid) {
      this.toastr.warning('Please fill all required fields.', 'Warning', {
        positionClass: 'toast-top-center',
      });
      return;
    }
    this.invoiceservice.saveinvoice(this.invoiceForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Invoice added successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
      },
      error: (err: any) => {
        this.toastr.error('Failed to add INVOICE.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }
}
