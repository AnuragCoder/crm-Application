import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../_service/customer/customer.service';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { PropasalService } from '../_service/proposal/propasal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';





@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent implements OnInit {
  public Editor = ClassicEditor;
  pTypeId: any = [];
  customerId: any;
  addCustomer = false;
  addCusromerStatus: any;
  customers: any;
  userList1: any = [];
  lastkeydown1 = 0;
  packageList: any[] = [];
  currency: any[] = ['INR', 'USD', 'GBP', 'EUR'];
  manulaPayBox: boolean = false;

  // for checkbox
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  DisplayEndDATE: Boolean = true;
  checkBoxDisplayDate: any = 'Check If no deadline required';
  checkBoxDisplayBuget : any = ''

  fileToUpload: File = null;
  paymentPackageDetails: any =  [] ;
  texttoaddPayemt = 'Chek to add payment manually';
  content : any;


  constructor(public rest: PropasalService , public fb: FormBuilder , public HttpCustomer: CustomerService) {  }

  PackageDetails = this.fb.group({
    customerId : [''],
    BusinessName : [''],
    packag_type : [''],
    package_list_id : [''],
    proposal_details : [''],
    StartDate : [''],
    endDate : [''],
    packageDetails : [''],
    signUpAmount: [''],
    signUpAmount_cur : [''],
    totalPackageFee : [''],
    totalPackageFee_cur : [''],
    full_package : [''],
    full_package_cur : [''],

 });



  ngOnInit() {

    this.getPackageType();
    this.getCustomer();
 }

 handleFileInput(files: FileList) {
   console.log(files);
  this.fileToUpload = files.item(0);
  console.log(this.fileToUpload);
}




 onSubmit() {
  let ProjectendDate;
  if (this.DisplayEndDATE){
    ProjectendDate = this.PackageDetails.get('endDate').value;

  } else {
    ProjectendDate = 'noDeadLine';
  }


  const token  = localStorage.getItem('currentUser');
  const data = {

    customerId: this.customerId,
    package_type_id	:	this.PackageDetails.get('packag_type').value,
    package_list_id	:	this.PackageDetails.get('package_list_id').value,
    proposal_details	: this.PackageDetails.get('proposal_details').value,
    StartDate	: this.PackageDetails.get('StartDate').value,
    endDate	: ProjectendDate,
    signUpAmount	:	this.PackageDetails.get('signUpAmount_cur').value +' ' +this.PackageDetails.get('signUpAmount').value,
    totalPackageFee	:	this.PackageDetails.get('totalPackageFee_cur').value + ' ' + this.PackageDetails.get('totalPackageFee').value,
    fullPackage	:	this.PackageDetails.get('full_package_cur').value + ' '+this.PackageDetails.get('full_package').value,
    };

     console.log(data);

   }



 getCustomer() {
  const token  = localStorage.getItem('currentUser');
  this.HttpCustomer.getCustomers(token).subscribe(result => {
    console.log(result);
    console.log(result.value.length);
    this.customers = result.value;
  }); }



  checkboxDuration(value) {
       console.log(value);
       if (value.checked) {
         this.DisplayEndDATE = false;
         this.checkBoxDisplayDate = 'uncheck if deadline';

       } else {
        this.DisplayEndDATE = true;
        this.checkBoxDisplayDate = 'Check If no deadline required';

       }

  }


  checkboxBuget(value){

  }



 getUserIdsFirstWay($event) {
   console.log($event);
   console.log($event.target.value);
   const userId = (document.getElementById('userIdFirstWay') as HTMLInputElement).value;

   this.userList1 = [];

   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList1 = this.searchFromArray(this.customers, userId);


      for(let i = 0 ; i < this.userList1.length ; i++){
        this.customerId = this.userList1[0].customerId;
      }
      console.log(this.customerId);

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
    this.rest.getPack(token).subscribe(result => {
      console.log(result.value);

      if (result.status === "1") {
            this.pTypeId  = result.value;
            this.getpackListName();
          }

    });

  }

  getpackListName() {

    const token  = localStorage.getItem('currentUser');
    console.log(this.PackageDetails.get('packag_type'));

    const value = {packagetypeId : this.PackageDetails.get('packag_type').value};
    console.log(value);
    this.rest.getpackList( value , token).subscribe(result => {
      console.log(result);
      if (result.status === '1') {
      this.packageList  = result.value;
      }

    });
  }

  getPackageDetails(value) {
    const packageList = this.PackageDetails.get('package_list_id').value;
    console.log(packageList);
    this.paymentPackageDetails.push([packageList.id , packageList.packageBudget , value ]);
    console.log(this.paymentPackageDetails);
  }

paymentManual(value) {
  console.log(value);
  if (value.checked) {
    this.manulaPayBox = true;
    this.getPackageDetails(1);
    this.texttoaddPayemt = 'Uncheck to add Auto Payment';
  } else if (!(value.checked)) {
    this.getPackageDetails(0);
    this.manulaPayBox = false;
    this.texttoaddPayemt = 'check to add Payment manually';
  }



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





  addContent(){
    this.content += `<div>
    <h2><span> Package INFO </span></h2>

        <div class='block-inline'>  <span> packag type </span>
          <select formControlName="packag_type" (change)='getpackListName()'>

              <option *ngFor="let item of pTypeId" [ngValue]="item.package_id" >{{item.package_name}}</option>
              </select>

      </div>

      <div *ngIf='PackageDetails.get("packag_type").value' class='block-inline'>
              <span> package list</span>
              <select formControlName="package_list_id" (change)='getPackageDetails()'>
                    <option *ngFor="let item of packageList" [ngValue]="item" >{{item.packageName}}</option>
              </select>
      </div>

      <div class='block-inline' class='block-inline' *ngIf='manulaPayBox'>
      <select>
      <option value='item' *ngFor="let item of currency" > {{item}} </option>
      </select>
      <input type='text' formControlName="signUpAmount" appOnlyNumber="true">
      </div>

    <div *ngIf='PackageDetails.get("package_list_id").value' class='block-inline'>
          <mat-checkbox class="example-margin" [labelPosition]="labelPosition" (change)='paymentManual($event)'>
          {{texttoaddPayemt}}
          </mat-checkbox>
    </div>




</div>`;
  }





}
