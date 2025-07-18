import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   isSidebarOpen = true;
  constructor(private router:Router){}
  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('token')
    this.router.navigateByUrl('');
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
