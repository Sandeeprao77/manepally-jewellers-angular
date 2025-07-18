import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}
  invoicelist(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.get('http://localhost:5500/invoice/getinvoice', {
      headers,
    });
  }
  updateinvoice(id: any, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.put(
      `http://localhost:5500/invoice/updateinvoice/${id}`,
      data,
      { headers }
    );
  }
  deleteinvoice(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.delete(
      `http://localhost:5500/invoice/deleteinvoice/${id}`,
      { headers }
    );
  }
  saveinvoice(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.post('http://localhost:5500/invoice/addinvoice', data,{ headers });
  }
}
