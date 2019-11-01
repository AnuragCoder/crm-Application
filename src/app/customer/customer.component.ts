import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../_service/customer/customer.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerData : any = [];
  addCustomer : boolean = false;
  displayedColumns: string[] = ['customerName', 'customerPhone', 'customerEmail', 'created_at'];
  dataSource : any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public rest : CustomerService) { }

  ngOnInit() {
    this.getCustomer();

  }

  getCustomer() {

    this.rest.getCustomers(localStorage.getItem('currentUser')).subscribe(result => {
      if(result['status'] == 1){
        this.customerData = result['value'];
        this.dataSource = new MatTableDataSource(this.customerData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      console.log(this.customerData)})
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  addCustmr() {
   this.addCustomer = !this.addCustomer;
  }





}
