import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'SingindCrmApp';


  route: any = [
    {name : 'Add customer' , route : 'addCustomer'},
    {name : 'New Proposal' , route : 'newProposal'},
    {name : 'All proposal' , route : 'newProposal'},
    {name : 'All Calls' , route : 'calls'},
    {name : 'Ticket' , route : 'ticket'},
    {name : 'Profile' , route : 'profile'},
    {name : 'logout' , route: 'login'}
  ];

  selectedItem: any = this.route[0];

  constructor() {}

   activeList(value) {
    this.selectedItem = value;
    console.log(this.selectedItem.route);
    if (this.selectedItem.route === 'login') {
      localStorage.removeItem('currentUser');
    }
  }

}
