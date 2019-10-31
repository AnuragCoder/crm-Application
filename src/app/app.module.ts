import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { NewProposalComponent } from './new-proposal/new-proposal.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllProposalComponent } from './all-proposal/all-proposal.component';
import { DetailedProposalComponent } from './detailed-proposal/detailed-proposal.component';
import { DashboardComponent } from './dashboard/dashboard.component';



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
    NewProposalComponent,
    SideNavComponent,
    AllProposalComponent,
    DetailedProposalComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule ,
    MatFormFieldModule ,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
