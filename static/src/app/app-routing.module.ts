import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavComponent } from 'projects/app1/src/app/nav/nav.component';
const routes: Routes = [
  {path: 'app1', loadChildren: '../../projects/app1/src/app/app.module#App1SharedModule'},
  {path: 'app2', loadChildren: '../../projects/app2/src/app/app.module#App2SharedModule'},
  // { path: ' ', redirectTo: '/app1/one'},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LoginComponent},
  { path: 'signup', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
