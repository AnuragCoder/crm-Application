import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SignupService {

 baseUrl : any = "https://www.magicmindtechnologies.com/crmApi/public/api/";
  
 signup : any =  this.baseUrl+ 'signUp';
 jobTitle : any = this.baseUrl + 'jobTitle';
 countryCode : any = this.baseUrl + 'countryCode';
 userNameCheck : any = this.baseUrl + 'userNameCheck';
  

  constructor(public http: HttpClient) {
    console.log(this.signup);
   }


   job() : Observable<any>{
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json; charset=utf-8');
    
     return this.http.get(this.jobTitle);
   }

   usernameCheck() : Observable<any>{
     return this.http.get(this.userNameCheck);
   }

   country() : Observable<any>{
     return this.http.get(this.countryCode)
   }
   
   

  SignUpUser() : Observable<any> {
    return this.signup.post(this.signup);
  }
}
