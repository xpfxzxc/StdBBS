import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolverService } from './user-detail/user-detail-resolver.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditGuard } from './user-edit/user-edit.guard';
import { UserEditResolverService } from './user-edit/user-edit-resolver.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

const usersRoutes: Routes = [
  {
    path: ':id',
    component: UserDetailComponent,
    resolve: {
      user: UserDetailResolverService
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id/edit',
    component: UserEditComponent,
    canActivate: [AuthenticatedGuard, UserEditGuard],
    resolve: {
      user: UserEditResolverService
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
