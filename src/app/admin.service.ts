import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  postadminlogin(data:any):Observable<any>{
    return this.http.post('http://localhost:5500/admin/adminlogin',data)
  }
 changePassword(data: { currentPassword: string; newPassword: string }) {
   const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
  return this.http.put('http://localhost:5500/admin/updateadmin', data,{ headers });
}
}
