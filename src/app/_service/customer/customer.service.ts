import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: any = 'https://www.magicmindtechnologies.com/crmApi/public/api/';
  addCusromer  = this.baseUrl + 'addCustomer';

  constructor(private http: HttpClient) { }


  addCustomer(data , token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);

    const newLocal = this.http.post<any>(this.addCusromer, data , {headers});
    return newLocal;

  }



}
