import { FormBuilder , Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LoginService } from '../service/login/login.service';
import { AuthenticationService } from '../_service/auth/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {




constructor(public fb: FormBuilder , public rest: AuthenticationService , public router: Router) {  }

userLogin =  this.fb.group({

  user:['', Validators.required],
  password:['' , Validators.required],
});

  ngOnInit() {

  }



  onSubmit() {


    const today = new Date();
    const date = today.getFullYear() +'-'+ (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date +' '+ time;

    const data = {
      username : this.userLogin.value.user,
      login_time : dateTime,
      password : this.userLogin.value.password,
    }


    this.rest.userlogin(data).subscribe(user => {

      console.log(user);
      if (user.status == 1) {
        console.log(user.job_title);

        localStorage.setItem('currentUser', user.auth_token);
       console.log(localStorage.getItem('currentUser'));


        if (user.job_id === 1) {
          console.log(user.job_id);

          this.router.navigate(['/admin']);

        } else if(user.job_id == 2) {
          this.router.navigate(['/addCustomer']);
        } else if(user.job_id == 3){
          alert(user.job_id);
          this.router.navigate(['/development']);
        } else {
          alert('else');
        }
     }





    } );


  }


  logout() {
    localStorage.removeItem('currentUser');
  }




}
