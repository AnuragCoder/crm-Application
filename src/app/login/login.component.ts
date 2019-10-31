import { FormBuilder , Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service/auth/authentication.service';
import { Router } from '@angular/router';
import { RouteService } from '../_commonStorage/route/route.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {




constructor(public fb: FormBuilder , public rest: AuthenticationService , public router: Router , public setroute : RouteService ) {  }

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
          localStorage.setItem('currentUser', user.auth_token);
          console.log(localStorage.getItem('currentUser'));
          this.setroute.setRoute(user['sideManu']);
          this.router.navigate(['/dashboard']);
       }

   } );


  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('job_title');

  }




}
