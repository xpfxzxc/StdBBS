import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UsersRoutingModule } from "./users-routing.module";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserDetailResolverService } from "./user-detail/user-detail-resolver.service";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserEditResolverService } from "./user-edit/user-edit-resolver.service";
import { UserRepliesComponent } from "./user-replies/user-replies.component";
import { UserTopicsComponent } from "./user-topics/user-topics.component";
import { RepliesModule } from "../replies/replies.module";
import { TopicsWithoutRoutingModule } from "../topics/topics-without-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    UserDetailComponent,
    UserEditComponent,
    UserTopicsComponent,
    UserRepliesComponent
  ],
  imports: [
    CommonModule,
    RepliesModule,
    SharedModule,
    TopicsWithoutRoutingModule,
    UsersRoutingModule
  ],
  providers: [UserDetailResolverService, UserEditResolverService]
})
export class UsersModule {}
