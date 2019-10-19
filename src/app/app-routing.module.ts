import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DevelopmentComponent } from './development/development.component';
import { SalesComponent } from './sales/sales.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  {path: 'login' , component : LoginComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'admin' , component: AdminComponent },
  {path: 'sales' , component: SalesComponent },
  {path: 'development' , component: DevelopmentComponent},
  {path: '' ,  component: SignupComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
