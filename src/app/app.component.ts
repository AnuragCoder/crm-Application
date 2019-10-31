
import { Component, ViewChild , AfterViewInit } from '@angular/core';

import { Router, NavigationStart } from '@angular/router';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  token: any;





  constructor(public nav: Router ) {
    let token = localStorage.getItem('currentUser');
    console.log(token);
    // if(token){
    //   this.nav.navigate(['']);
    // }


    nav.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        if (event['url'] == '/login' || event['url'] ==  '/signup' ) {
          localStorage.removeItem('currentUser');
         } else {

        }
      }
    });
  }






}
