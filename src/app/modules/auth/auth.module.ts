import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NotAuthenticatedGuard } from './not-authenticated.guard';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, CommonModule, SharedModule],
  providers: [NotAuthenticatedGuard]
})
export class AuthModule {}
