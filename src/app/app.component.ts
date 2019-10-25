import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'SingindCrmApp';
  selectedItem : any;

  route: any = [
    {name : 'Add customer' , route : 'addCustomer'},
    {name : 'New Proposal' , route : 'newProposal'},
    {name : 'All proposal' , route : 'newProposal'},
    {name : 'All Calls' , route : 'calls'},
    {name : 'Ticket' , route : 'ticket'},
    {name : 'Profile' , route : 'profile'},
  ];

  constructor() {}

   activeList(value) {

    this.selectedItem = value;
    console.log(this.selectedItem);
  }

}
