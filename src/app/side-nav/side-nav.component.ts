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

  constructor(public nav: Router , public getRoute : RouteService) {
    this.route = this.getRoute.getRoute();
    console.log(this.route);

      this.nav.navigate([this.route[0].route]);
      this.selectedItem = this.route[0];
    }

  ngOnInit() {


  }

          activeList(value) {
                 this.selectedItem = value;

                 console.log(this.selectedItem.route);

                 if (this.selectedItem.route == 'login') {
                             localStorage.removeItem('currentUser');
                             localStorage.removeItem('job_id');
                             this.token = '';
                             this.nav.navigate(['/login']);

                           }
         }

}
