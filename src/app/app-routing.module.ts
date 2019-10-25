import { NewProposalComponent } from './new-proposal/new-proposal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AdminComponent } from './admin/admin.component';

import { AddCustomersComponent } from './add-customers/add-customers.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketComponent } from './ticket/ticket.component';
import { CallsDetailsComponent } from './calls-details/calls-details.component';
import { AuthGuard } from './_guards/auth.guard';





const routes: Routes = [
  {path: '' ,  component: SignupComponent, pathMatch: 'full' },
  {path: 'login' , component : LoginComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'admin' , component: AdminComponent , canActivate: [AuthGuard] },
  {path: 'newProposal' , component: NewProposalComponent , canActivate: [AuthGuard] },
  {path: 'addCustomer' , component : AddCustomersComponent , canActivate: [AuthGuard]},

  {path: 'profile' , component: ProfileComponent , canActivate: [AuthGuard] },
  {path: 'ticket' , component: TicketComponent , canActivate: [AuthGuard]},
  {path: 'calls' , component: CallsDetailsComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
