import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  invoiceCount = 0;
  customerCount = 0;
  salesCount = 0;
  paidInvoices = 0;

  branches = {
    Secunderabad: 0,
    Madhapur: 0,
    Kukatpally: 0,
    karimnagar:0
  };

 
  invoices = [
    { id: 1, amount: 1000, paid: true, branch: 'mumbai' },
    { id: 2, amount: 2000, paid: false, branch: 'bangalore' },
    { id: 3, amount: 3000, paid: true, branch: 'hyderabad' },
    { id: 4, amount: 1500, paid: true, branch: 'bangalore' },
    { id: 5, amount: 1200, paid: true, branch: 'mumbai' },
  ];

  customers: string[] = [];
  ngOnInit(): void {
    this.invoiceCount = this.invoices.length;
    this.customerCount = this.customers.length;
    this.salesCount = this.invoices.reduce((sum, i) => sum + i.amount, 0);
    this.paidInvoices = this.invoices.filter(i => i.paid).length;

    
    this.branches.Secunderabad = this.invoices.filter(i => i.branch === 'mumbai').length;
    this.branches.Madhapur = this.invoices.filter(i => i.branch === 'bangalore').length;
    this.branches.Kukatpally = this.invoices.filter(i => i.branch === 'hyderabad').length;
     this.branches.karimnagar = this.invoices.filter(i => i.branch === 'hyderabad').length;
  }
   
  }


