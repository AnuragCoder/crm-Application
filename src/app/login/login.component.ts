import { FormBuilder , Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignupService } from '../service/signup/signup.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



constructor(public fb: FormBuilder , public rest : SignupService) { alert('Hello'); }

userLogin =  this.fb.group({

  user:['', Validators.required],
  password:['' , Validators.required],
})

  ngOnInit() {
  }



  onSubmit(){
    let data = {
      user : this.userLogin.get('user'),
      password : this.userLogin.get('password')
    }


    this.rest.signup(data).subscribe(result => console.log(result));

  }


}
