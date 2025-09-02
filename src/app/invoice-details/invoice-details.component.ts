import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent implements OnInit{
  invoiceForm!:FormGroup;
  ngOnInit(): void {
    
  }

}
