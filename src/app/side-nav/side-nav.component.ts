import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {



  token: any = localStorage.getItem('currentUser');


  route: any = [
    {name : 'Add customer' , route : 'addCustomer'},
    {name : 'New Proposal' , route : 'newProposal'},
    {name : 'All proposal' , route : 'allProposal'},
    {name : 'All Calls' , route : 'calls'},
    {name : 'Ticket' , route : 'ticket'},
    {name : 'Profile' , route : 'profile'},
    {name : 'logout' , route: 'login'}
  ];

  selectedItem: any = this.route[0];

  constructor(public nav: Router) {}

  ngOnInit() {

  }

  activeList(value) {
   this.selectedItem = value;

   console.log(this.selectedItem.route);
   if (this.selectedItem.route == 'login') {
     localStorage.removeItem('currentUser');
     this.token = '';
     this.nav.navigate(['/login']);

   } else {

    console.log('true');
   }
 }

}
