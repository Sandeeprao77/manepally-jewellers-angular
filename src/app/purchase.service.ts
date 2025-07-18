import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private http: HttpClient) {}
  purchaselist(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));

    return this.http.get('http://localhost:5500/purchase/getpurchase', {
      headers,
    });
  }
  updatepurchase(id: any, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.put(
      `http://localhost:5500/purchase/updatepurchase/${id}`,
      data,
      { headers }
    );
  }
  deletepurchase(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.delete(
      `http://localhost:5500/purchase/deletepurchase/${id}`,
      { headers }
    );
  }
  savepurchase(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));

    return this.http.post('http://localhost:5500/purchase/addpurchase', data, {
      headers,
    });
  }
}
