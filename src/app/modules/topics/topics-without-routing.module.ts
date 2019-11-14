import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TopicCreateAndEditComponent } from "./topic-create-and-edit/topic-create-and-edit.component";
import { TopicEditResolverService } from "./topic-create-and-edit/topic-create-and-edit-resolver.service";
import { TopicDetailComponent } from "./topic-detail/topic-detail.component";
import { TopicDetailResolverService } from "./topic-detail/topic-detail-resolver.service";
import { TopicListComponent } from "./topic-list/topic-list.component";
import { TopicListSimplifyComponent } from "./topic-list-simplify/topic-list-simplify.component";
import { TopicsComponent } from "./topics/topics.component";
import { TopicsResolverService } from "./topics/topics-resolver.service";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    TopicCreateAndEditComponent,
    TopicDetailComponent,
    TopicListComponent,
    TopicListSimplifyComponent,
    TopicsComponent
  ],
  exports: [TopicListSimplifyComponent, TopicsComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [
    TopicDetailResolverService,
    TopicEditResolverService,
    TopicsResolverService
  ]
})
export class TopicsWithoutRoutingModule {}
