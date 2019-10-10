import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SignupService {

 baseUrl: any = "https://www.magicmindtechnologies.com/crmApi/public/api/";

 signup: any =  this.baseUrl + 'signUp';
 login: any = this.baseUrl + 'login';
 jobTitle: any = this.baseUrl + 'jobTitle';
 countryCode: any = this.baseUrl + 'countryCode';
 checkuserName: any = this.baseUrl + 'userNameCheck';


  constructor(public http: HttpClient) {
    console.log(this.signup);
   }


   job() : Observable<any>{
     return this.http.get(this.jobTitle);
   }

   usernameCheck(data) : Observable<any>{



     console.log(data);
     let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Accept' , 'application/json');
    let httpOptions = {
      headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',

          }
      ),
        }

     return this.http.post(this.checkuserName , data , { headers: headers });
   }

   country() : Observable<any>{
     return this.http.get(this.countryCode)
   }



  SignUpUser(value): Observable<any> {
    console.log(value);
    return this.http.post(this.signup , value)
  }

  Userlogin(value): Observable<any>{
    console.log(value);
    return this.http.post(this.login , value)
  }
}
