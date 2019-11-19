import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ReplyBoxComponent } from "./reply-box/reply-box.component";
import { ReplyListComponent } from "./reply-list/reply-list.component";
import { ReplyListSimplifyComponent } from "./reply-list-simplify/reply-list-simplify.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    ReplyBoxComponent,
    ReplyListComponent,
    ReplyListSimplifyComponent
  ],
  exports: [ReplyBoxComponent, ReplyListComponent, ReplyListSimplifyComponent],
  imports: [CommonModule, RouterModule, SharedModule]
})
export class RepliesModule {}
