import { Component, OnInit ,  Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
 // currency: any[] = ['INR', 'USD', 'GBP', 'EUR'];
  manulaPayBox: boolean = false;

  // for checkbox
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  DisplayEndDATE: boolean = true;
  checkBoxDisplayDate: any = 'Check If no deadline required';
  checkBoxDisplayBuget: any = '';

  fileToUpload: File = null;
  paymentPackageDetails: any =  [] ;
  texttoaddPayemt = 'Chek to add payment manually';
  content: any;
  checkBoxforADDINGbudgetmanually: any = 'Check to add custom payment for full package';
  cbforPaymanually: boolean = false;
  currency: any  = [];
  cbByHour: any = 'Check if client wants to add duration by hour';
  DisplaybyDate: boolean = true;
  files: any = [];
  array: any = ['1'];
  PackageDetails: FormGroup;
 
 


  constructor(public rest: PropasalService , public fb: FormBuilder , public HttpCustomer: CustomerService) {

    this.PackageDetails = this.fb.group({
      customerId : [''],
      BusinessName : [''],
      proposal_details : [''],
      Package_budget : this.fb.array([this.addPayment()]),
      StartDate : [''],
      endDate : [''],
      // packageDetails : [''],
      signUpAmount: [''],
      signUpAmount_cur : [''],
      totalPackageFee : [''],
      totalPackageFee_cur : [''],
      full_package : [''],
      full_package_cur : [''],
    
    });
  
  
  
  }

   ngOnInit() {
    this.getPackageType();
    this.getCustomer();
    this.getCurrency();
    }


 addPayment(): FormGroup {

  return this.fb.group({
    packag_type : [''],
    package_list_id : [''],
    custumCosting : [''],
    checktoaddPayemt : ['']
  });
}

add(): void {
  console.log(this.PackageDetails.get('Package_budget')['controls']);
  console.log((<FormArray>this.PackageDetails.get('Package_budget')));
  (<FormArray>this.PackageDetails.get('Package_budget')).push(this.addPayment());

}

getPackageType() {
  const token  = localStorage.getItem('currentUser');
  console.log(token);
  this.rest.getPack(token).subscribe(result => {
    console.log(result);
    if (result.status === "1") {

          this.pTypeId  = result.value;
          console.log(this.pTypeId);
          console.log('hello');
        }
  });
}

getpackListName() {
  const token  = localStorage.getItem('currentUser');
  // const packageList = this.PackageDetails.value['Package_budget'];
  // console.log(this.PackageDetails);
  const value = {packagetypeId : this.PackageDetails.value.Package_budget[0].packag_type};
  console.log(this.PackageDetails.value.Package_budget[0].packag_type);
  if (value) {
  this.rest.getpackList( value , token).subscribe(result => {
    console.log(result);
    if (result.status === '1') {
    this.packageList  = result.value;
    }
 });
}
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

 //Get Customer By Id
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

getCustomer() {
  const token  = localStorage.getItem('currentUser');
  this.HttpCustomer.getCustomers(token).subscribe(result => {
    console.log(result);
    console.log(result.value.length);
    this.customers = result.value;
  }); }

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





//Get Customer By Id Ends



//Paymant And Packages







getPackageDetails(value) {
  console.log(value);
  // const packageList = this.PackageDetails.value['Package_budget'];
  // console.log(packageList);
  // this.paymentPackageDetails.push([packageList.id , packageList.packageBudget , value ]);
  // console.log(this.paymentPackageDetails);
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



checkboxforFullPackage(value) {

  console.log(value);
  if (value.checked) {
    console.log('Checked >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
         this.cbforPaymanually = true;
         this.checkBoxforADDINGbudgetmanually = 'uncheck to add payment indivisually';

       } else {
         console.log('Unchecked >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        this.cbforPaymanually = false;
        this.checkBoxforADDINGbudgetmanually = 'Check to add custom payment for full package';

       }

}

//Package and Paymwnts Ends







//Time Duration of Project

  checkboxDuration(value) {
       console.log(value);
       if (value.checked) {
         this.DisplayEndDATE = false;
         this.checkBoxDisplayDate = 'uncheck if deadline';

       } else {
        this.DisplayEndDATE = true;
        this.checkBoxDisplayDate = 'Check If no deadline required';
         } }

  CheckBoxByHour(value){
    console.log(value);
    if (value.checked) {
      this.DisplaybyDate = false;
      this.cbByHour = 'uncheck if client wants to add duration by Date';

    } else {
     this.DisplaybyDate = true;
     this.cbByHour = 'Check if client wants to add duration by hour';
       }}

  //Time Duration of Project ends


// file Upload
uploadFile(event) {
  for (let index = 0; index < event.length; index++) {
    const element = event[index];
    this.files.push(element.name)
  }
}
deleteAttachment(index) {
  this.files.splice(index, 1)
}

//FileUpload Ends







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


  //File   ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        /** In Angular , including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
    }
}





  addContent(){
    this.content += `
    <ng-container>
    <div>
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
   </div>
   </ng-container>
   `;
  }


  getCurrency(){
    this.rest.getProjectCurrency().subscribe(result =>

      {
        console.log(result);
        if(result.status == 1){
          for(let i = 0 ; i < result['value'].length ; i++) {
              this.currency.push(result['value'][i].code);
          }
        }
        console.log(this.currency);
      });
  }



}
