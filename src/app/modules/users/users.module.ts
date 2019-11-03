import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolverService } from './user-detail/user-detail-resolver.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolverService } from './user-edit/user-edit-resolver.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UserDetailComponent, UserEditComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
  providers: [UserDetailResolverService, UserEditResolverService]
})
export class UsersModule {}
