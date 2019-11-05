import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../_service/customer/customer.service';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { PropasalService } from '../_service/proposal/propasal.service';





@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent implements OnInit {

  pTypeId: any = [];
  addCustomer = false;
  addCusromerStatus: any;
  customers: any;
  userList1: any = [];
  lastkeydown1 = 0;
  packageList: any[] = [];


  constructor(public rest: PropasalService , public fb: FormBuilder , public HttpCustomer: CustomerService) {  }

  PackageDetails = this.fb.group({
    customerId : [''],
    packag_type : [''],
    package_list_id : [''],
    proposal_details : [''],
    packageDetails : [''],
    signUpAmount: [''],
    totalPackageFee : [''],
    full_package : [''],
 });



  ngOnInit() {

    this.getPackageType();
    this.getCustomer();
 }


 onSubmit() {


  const token  = localStorage.getItem('currentUser');
  const data = {
    // this.PackageDetails.get('customerId').value
    customerId: 19,
    package_type_id	:	this.PackageDetails.get('packag_type').value,
    package_list_id	:	this.PackageDetails.get('package_list_id').value,
    proposal_details	: this.PackageDetails.get('packageDetails').value,
    signUpAmount	:	this.PackageDetails.get('signUpAmount').value,
    totalPackageFee	:	this.PackageDetails.get('totalPackageFee').value,

    fullPackage	:	this.PackageDetails.get('full_package').value,
    };



  console.log(data);

  this.rest.newProposals(data , token).subscribe( result => {
    console.log(result);
    if (result['status'] == 1) {
      this.PackageDetails.reset();
      alert('Proposal Added');
    } else{
      alert('error occured');
    }  });
}

 getCustomer() {
  const token  = localStorage.getItem('currentUser');
  this.HttpCustomer.getCustomers(token).subscribe(result => {
    console.log(result);
    console.log(result.value.length);
    this.customers = result.value;
  }); }




 getUserIdsFirstWay($event) {

   const userId = (document.getElementById('userIdFirstWay') as HTMLInputElement).value;

   this.userList1 = [];

   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList1 = this.searchFromArray(this.customers, userId);
      console.log(this.userList1);
    }
  }
}

searchFromArray(arr, regex) {
   // http://www.mukeshkumar.net/articles/angular/3-ways-to-implement-autocomplete-textbox-in-angular-with-typescript-on-large-data
  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:one-variable-per-declaration
  let matches = [], i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].customerName.match(regex)) {
      matches.push(arr[i]);
    }
  }
  console.log(matches);
  return matches;
}



  getPackageType() {
    const token  = localStorage.getItem('currentUser');
    console.log(token);
    this.rest.getPack(token).subscribe(result => {console.log(result);

                                                  if (result.status === 1) {
                                                       this.pTypeId  = result.value;
                                                     }

    });

  }

  getpackListName() {
    const token  = localStorage.getItem('currentUser');
    console.log(token);
    const value = {packagetypeId : this.PackageDetails.get('packag_type').value};
    console.log(value);
    this.rest.getpackList( value , token).subscribe(result => {console.log(result);
                                                               if (result.status === 1) {
      this.packageList  = result.value;
      }

    });
  }


  onCustomerAdd(value) {
    console.log(value);
    if (value.status === 1) {
      this.addCusromerStatus  = value.message;

      this.addCustomer = false;

    }
  }

  addCustomerField() {
    console.log(!this.addCustomer);
    this.addCustomer = !(this.addCustomer);
    console.log(this.addCustomer);
  }











}
