import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '../_service/sales/sales.service';





@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  pTypeId: any = [];

  constructor(public rest: SalesService , public fb: FormBuilder) {  }

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

}
