import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotAuthenticatedGuard } from './not-authenticated.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [NotAuthenticatedGuard],
    canActivateChild: [NotAuthenticatedGuard],
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
