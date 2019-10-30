import { Component, ViewChild , AfterViewInit } from '@angular/core';

import { Router, NavigationStart } from '@angular/router';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  token: any;
  //any = localStorage.getItem('currentUser');


  route: any = [
    {name : 'Add customer' , route : 'addCustomer'},
    {name : 'New Proposal' , route : 'newProposal'},
    {name : 'All proposal' , route : 'allProposal'},
    // {name : 'All Calls' , route : 'calls'},
    {name : 'Ticket' , route : 'ticket'},
    {name : 'Profile' , route : 'profile'},
    {name : 'logout' , route: 'login'}
  ];

  selectedItem: any = this.route[0];

  constructor(public nav: Router ) {

    nav.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event['url']);
        if (event['url'] == '/login' || event['url'] ==  '/signup' ) {
          localStorage.removeItem('currentUser');
          this.token = localStorage.getItem('currentUser');
        } else {
          // console.log("NU")
          this.token = localStorage.getItem('currentUser');
        }
      }
    });
  }






}
