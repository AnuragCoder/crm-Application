import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../service/signup/signup.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 JobTitle : any = [];
 countries : any = [];
 country_code : any;
 passWorCheck : boolean =  false;
 userNameCheck : boolean = false;

  userSignup = this.fb.group({
    name: ['' , Validators.required  ],
    username: [ '', [Validators.required , Validators.pattern('^[_A-z0-9]{1,}$') , Validators.minLength(6)]],
    email: ['' , [Validators.required , 	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: ['' , [Validators.required , Validators.minLength(6)]],
    confirmPass : ['' , [Validators.required , Validators.minLength(6)]],
    phone: ['' , [Validators.required , Validators.minLength(10)]],
    jobTile: ['' , Validators.required],
    country: ['' , Validators.required],
    jobRole: ['' , Validators.required],

    address: ['', Validators.required],
    city:['', Validators.required],
 });

  constructor(private fb: FormBuilder ,public res : SignupService ) { }

  ngOnInit() {

   // console.log(this.countries[0].name);
    this.getjobTitle();
    this.countrycode();
  }

  checkusername(value){
    console.log(value);
    console.log(this.userSignup.value.username);
    let username = {"username": this.userSignup.value.username}
    if(value.length >= 6 ){
    this.res.usernameCheck(username).subscribe(result => {

      // this.userNameCheck = result

      if(result['status']==0){
         this.userNameCheck = true;
      }else{
         this.userNameCheck = false;
      }



      console.log(result);
    })
  }
  }

  getjobTitle(){

    this.res.job().subscribe(result => {
      console.log(result);
      if(result['status'] == 1){
        console.log(result['value']);

        this.JobTitle = result['value'];
        console.log(this.JobTitle);


        // let joblist
        // joblist = result['value'];
        // for(let i = 0 ; i < joblist.length ; i++ ){
        //   console.log(i);
        //   console.log(joblist[i].job_name);
        //   this.JobTitle.push(joblist[i].job_name);
        // }
        //  console.log(this.JobTitle);
      }
       },
    err => {
      console.log(err);
    })
  }

  checkPass(value){
     if(this.userSignup.value.password){
     if(this.userSignup.value.password == value){
       console.log('password match');
       this.passWorCheck = true;

    }else{
      this.passWorCheck = false;
     }
    }
   }

  setCountryCode(value){
    console.log(value);
    const index = this.countries.findIndex( record => record.country_name === value );
    this.country_code = this.countries[index].country_code;
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
    console.log(this.userSignup.value.jobTile);
    console.log(this.userSignup.value);
  let data =   {
  name : this.userSignup.value.name,
	username : this.userSignup.value.username,
	password : this.userSignup.value.password,
	job_title : this.userSignup.value.jobTile,
	job_role : this.userSignup.value.jobRole,
	email :this.userSignup.value.email,
	country_code : this.country_code,
	phone_number : this.userSignup.value.phone,
	addstr1 : this.userSignup.value.address,
	country : this.userSignup.value.country,
	state : '',
	city : '',
	postal_code : '',
    }
 console.log(data);
    this.res.SignUpUser(data).subscribe(result => console.log(result));
  }



}
