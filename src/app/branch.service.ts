import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }
  branchlist():Observable<any>{
     const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.get('http://localhost:5500/branch/getbranch',{ headers })
  }
  updatebranch(id:any,data:any):Observable<any>{
     const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.put(`http://localhost:5500/branch/updatebranch/${id}`,data,{ headers })
  }
  deletebranch(id:string):Observable<any>{
     const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.delete(`http://localhost:5500/branch/deletebranch/${id}`,{ headers })
  }
  savebranch(data:any):Observable<any>
  {localStorage.getItem('admin');

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers.get('Authorization'));
    return this.http.post('http://localhost:5500/branch/addbranch',data,{ headers })
  }
}
