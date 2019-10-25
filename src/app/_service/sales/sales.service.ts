import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  baseUrl: any = "https://www.magicmindtechnologies.com/crmApi/public/api/";
  salesInfo: any = this.baseUrl + 'salesCustomerInfo';
  addProposals: any = 'addProposals';

//   auth-token	:	NTJlYjdhZThkNzkzMDg1ZTBkYTAxOThmY2Y0NGI3YTllNGYxZDE3ODRmMzgyNTFmNjk2NDMyOTAzYWNjNDExMQ==
// username	:	taniya


packageType: any = this.baseUrl + 'packageType';

  constructor(private http: HttpClient) { }

  getPack(token): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Authorization', token);
    return this.http.get<any>(this.packageType , {headers});
  }


  packageDetails(value, token): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Authorization', token);

    return this.http.post<any>(this.salesInfo ,  value , {headers});

  }

  newProposals(value , token) {
   let headers = new HttpHeaders();
   headers = headers.append('Content-Type', 'application/json; charset=utf-8');
   headers = headers.append('Authorization', token);
   return this.http.post<any>(this.addProposals , value , {headers});
  }




}
