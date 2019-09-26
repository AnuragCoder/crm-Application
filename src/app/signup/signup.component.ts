import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SignupService } from '../service/signup/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 JobTitle : any = ['acdjcdjvdjv','cdvdvb','cvdvd','vdvdvd','csjcsjc'];
 countries : any = [];

  userSignup = this.fb.group({
    name: [''],
    username: [''],
    emai: [''],
    password: [''],
    phone: [''],
    jobTile: [''],
    country: [''],
    country_iso_code : ['country'],
    jobRole: [''],
    address: ['']
 }); 

  constructor(private fb: FormBuilder ,public res : SignupService ) { }

  ngOnInit() {
   // console.log(this.countries[0].name);
    this.jobTitle();
    this.countrycode();
  }

  jobTitle(){
  
    this.res.job().subscribe(result => {
      console.log(result);

    },
    err => {
      console.log(err);
    })
  }
 
  setCountryCode(value){
    console.log(value);
    const index = this.countries.findIndex( record => record.country_name === value );
    console.log(this.countries[index]);

  //  console.log(value.length);
  //  console.log(value.country_code);
  //  console.log(value.country_code);
  }


  countrycode(){
    this.res.country().subscribe(result => {
      console.log(result);
      if(result['status'] == 1){

        this.countries = result['value'];
        console.log(this.countries);
        console.log(this.countries.length);

      }
    },
    err => {
      console.log(err);
    })
  }



  submitt(){
    console.log(this.userSignup.value);
  }

}
