import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl: any = "https://www.magicmindtechnologies.com/crmApi/public/api/";
  loginUrl: any = this.baseUrl + 'login';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}


//https://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example#auth-guard-ts

// baseUrl: any = "https://www.magicmindtechnologies.com/crmApi/public/api/";
// login: any = this.baseUrl + 'login';

// constructor(public http: HttpClient) { }


// userlogin(value): Observable<any> {
//   console.log(value);
//   return this.http.post(this.login , value);
// }

userlogin(value): Observable<any> {
    return this.http.post<any>(this.loginUrl, value)
        .pipe(map(user => {
          console.log(user);
            // if (user && user.token) {
            //     localStorage.setItem('currentUser', JSON.stringify(user));
            //     this.currentUserSubject.next(user);
            // }

            // return user;

           if((user['status'] == 1) && user['auth_token']){
            localStorage.setItem('currentUser', user['auth_token']);
            this.currentUserSubject.next(user);
           }

           return user;

        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}




}
