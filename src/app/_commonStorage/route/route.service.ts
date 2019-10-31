import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  router: any = [];

  constructor() { }

  getRoute() {
   return this.router;
  }

  setRoute(value) {
    this.router = value;
    console.log(this.router);
  }
}
