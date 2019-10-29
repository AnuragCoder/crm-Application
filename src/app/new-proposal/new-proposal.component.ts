import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/_service/sales/sales.service';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../_service/customer/customer.service';



@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent implements OnInit {

  pTypeId: any = [];
  addCustomer: boolean = false;
  addCusromerStatus: any;
  customers: any ;

  constructor(public rest: SalesService , public fb: FormBuilder , public HttpCustomer : CustomerService) {  }

  PackageDetails = this.fb.group({
    customerName : [''],
    customerPhone : [''],
    businessName : [''],
    customerEmail : [''],
    customerAddress : [''],
    fullPackage: [''],
    packageDetails : [''],
    signUpAmount: [''],
    totalPackageFee : [''],
    packageTypeId : [''],
 });



  ngOnInit() {

    this.getPackageType();
    this.getCustomer();
  }

  getPackageType() {
    const token  = localStorage.getItem('currentUser');
    console.log(token);
    this.rest.getPack(token).subscribe(result => {console.log(result);

                                                  if (result.status == 1) {
                                                       this.pTypeId  = result.value;
                                                     }

    });

  }


  onCustomerAdd(value){
    console.log(value);
    if(value['status'] == 1){
      this.addCusromerStatus  = value['message'];

      this.addCustomer = false;

    }
  }

  addCustomerField(){
    console.log(!this.addCustomer);
     this.addCustomer = !(this.addCustomer);
     console.log(this.addCustomer);
  }


  onSubmit() {

    console.log(this.PackageDetails.get('customerName').value);
    const token  = localStorage.getItem('currentUser');
    const data = {
      customerName: this.PackageDetails.get('customerName').value,
      customerPhone	:	this.PackageDetails.get('customerPhone').value,
      businessName	:	this.PackageDetails.get('businessName').value,
      customerEmail	:	this.PackageDetails.get('customerEmail').value,
      customerAddress	: this.PackageDetails.get('customerAddress').value,
      fullPackage	:	this.PackageDetails.get('fullPackage').value,
      packageDetails	: this.PackageDetails.get('packageDetails').value,
      signUpAmount	:	this.PackageDetails.get('signUpAmount').value,
      totalPackageFee	:	this.PackageDetails.get('totalPackageFee').value,
      packageTypeId	:	this.PackageDetails.get('packageTypeId').value,
      };

    console.log(data);

    this.rest.packageDetails(data , token).subscribe( result => {console.log(result); });
  }


  getCustomer() {
    const token  = localStorage.getItem('currentUser');
    this.HttpCustomer.getCustomers(token).subscribe(result => {
      console.log(result);
      this.customers = result;
    });
  }

}
