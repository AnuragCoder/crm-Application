import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../_service/customer/customer.service';




@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss']
})
export class AddCustomersComponent implements OnInit {


 // tslint:disable-next-line:no-output-on-prefix
 @Output() onCustomerAdded: EventEmitter<any> = new EventEmitter<any>();
  constructor(public fb: FormBuilder , public rest: CustomerService) {
   }

  customerInfo = this.fb.group({
    name : [],
    phone : [],
    website : [],
    email : [],
    address : []
    });

  ngOnInit() {
  }


  addCustomer() {
    const value =  {
      customerName	:	this.customerInfo.get('name').value,
      customerPhone	:	this.customerInfo.get('phone').value,
      website	: this.customerInfo.get('website').value,
      customerEmail	:	this.customerInfo.get('email').value,
      customerAddress	:	this.customerInfo.get('address').value
     };
    console.log(value);

    const token = localStorage.getItem('currentUser');
    console.log(token);
    this.rest.addCustomer(value  , token).subscribe(result => {
      console.log(result);
      this.onCustomerAdded.emit(result);
      if (result['status'] == 1) {

        this.customerInfo.reset(this.customerInfo.value);

        alert(result['message']);

      } else {
        alert('try Again');
      }
    });

    }

}
