import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OnlyNumberDirective } from './_directive/only-number.directive';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';


import { AddCustomersComponent } from './add-customers/add-customers.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketComponent } from './ticket/ticket.component';
import { CallsDetailsComponent } from './calls-details/calls-details.component';
import { NewProposalComponent } from './new-proposal/new-proposal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    OnlyNumberDirective,
    AdminComponent,
    UserComponent,


    AddCustomersComponent,
    ProfileComponent,
    TicketComponent,
    CallsDetailsComponent ,
    NewProposalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
