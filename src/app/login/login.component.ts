import { FormBuilder , Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LoginService } from '../service/login/login.service';
import { AuthenticationService } from '../_service/auth/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



constructor(public fb: FormBuilder , public rest : AuthenticationService) {  }

userLogin =  this.fb.group({

  user:['', Validators.required],
  password:['' , Validators.required],
});

  ngOnInit() {

  }



  onSubmit() {


    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    let data = {
      username : this.userLogin.value.user,
      login_time : dateTime,
      password : this.userLogin.value.password,
    }


    this.rest.userlogin(data).subscribe(result => console.log(result)




    );

  }




}
