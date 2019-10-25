import { NewProposalComponent } from './new-proposal/new-proposal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DevelopmentComponent } from './development/development.component';

import { AdminComponent } from './admin/admin.component';

import { AddCustomersComponent } from './add-customers/add-customers.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketComponent } from './ticket/ticket.component';
import { CallsDetailsComponent } from './calls-details/calls-details.component';





const routes: Routes = [
  {path: '' ,  component: SignupComponent, pathMatch: 'full' },
  {path: 'login' , component : LoginComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'admin' , component: AdminComponent },
  {path: 'newProposal' , component: NewProposalComponent },
  {path: 'addCustomer' , component : AddCustomersComponent},
  {path: 'development' , component: DevelopmentComponent},
  {path: 'profile' , component: ProfileComponent },
  {path: 'ticket' , component: TicketComponent},
  {path: 'calls' , component: CallsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
