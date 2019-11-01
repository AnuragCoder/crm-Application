import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../_commonStorage/route/route.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {



  token: any = localStorage.getItem('currentUser');


  route: any =  [];



  selectedItem: any;

  constructor(public nav: Router , public getRoute: RouteService) {


    }

  ngOnInit() {
      this.getRouteData();
    }


  getRouteData() {
    this.route = [
      {
        'id': '1',
        "sidebar_name": "customer",
        'sidebar_route': 'viewCustomer'
      },
      {
        "id": "2",
        "sidebar_name": "Proposal",
        "sidebar_route": 'viewProposal'
      },
      {
        'id': '5',
        'sidebar_name': "Ticket",
        "sidebar_route": "ticket"
      },
      {
        "id": "6",
        "sidebar_name": "Profile",
        'sidebar_route': "profile"
      },
      {
        "id": "7",
        "sidebar_name": "logout",
        "sidebar_route": "login"
      }
    ]

    this.nav.navigate([this.route[0].sidebar_route]);
    this.selectedItem = this.route[0];
    this.activeList(this.route[0]);
  }

  activeList(value) {
    this.selectedItem = value;

    console.log(this.selectedItem.sidebar_route);

    if (this.selectedItem.sidebar_route == 'login') {
                localStorage.removeItem('currentUser');
                console.log(localStorage.getItem('currentUser'));
                this.nav.navigate(['/login']);
                // localStorage.removeItem('job_id');
                // this.token = '';
                // this.nav.navigate(['/login']);

              }
}

}
