import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropasalService {
  baseUrl: any = 'https://www.magicmindtechnologies.com/crmApi/public/api/';

  addProposals: any =  this.baseUrl + 'addProposals';
  packageType: any = this.baseUrl + 'packageType';
  packageList: any = this.baseUrl + 'packageList';
  allProposal : any = this.baseUrl + 'getProposalsByAgent';


  constructor(private http: HttpClient) { }

  getPack(token): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Authorization', token);
    return this.http.get<any>(this.packageType , {headers});
  }

  getpackList(value, token): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Authorization', token);

    return this.http.post<any>(this.packageList ,  value , {headers});
}


 newProposals(value , token) {
   let headers = new HttpHeaders();
   headers = headers.append('Content-Type', 'application/json; charset=utf-8');
   headers = headers.append('Authorization', token);
   return this.http.post<any>(this.addProposals , value , {headers});
  }

  getProposal(token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    const allProposal =  this.http.get<any>(this.allProposal , {headers});
    return allProposal;
  }




}
