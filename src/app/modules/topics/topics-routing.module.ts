import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TopicCreateAndEditComponent } from "./topic-create-and-edit/topic-create-and-edit.component";
import { TopicEditResolverService } from "./topic-create-and-edit/topic-create-and-edit-resolver.service";
import { TopicDetailComponent } from "./topic-detail/topic-detail.component";
import { TopicDetailResolverService } from "./topic-detail/topic-detail-resolver.service";
import { TopicsComponent } from "./topics/topics.component";
import { TopicsResolverService } from "./topics/topics-resolver.service";
import { AuthenticatedGuard } from "../auth/authenticated.guard";

const TopicsRoutes: Routes = [
  {
    path: "",
    component: TopicsComponent,
    data: { title: "话题列表" },
    resolve: {
      topicPagination: TopicsResolverService
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: "create",
    component: TopicCreateAndEditComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      title: "新建话题"
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: ":id/edit",
    component: TopicCreateAndEditComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      title: "编辑话题"
    },
    resolve: {
      topic: TopicEditResolverService
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: ":id",
    component: TopicDetailComponent,
    resolve: {
      topic: TopicDetailResolverService
    },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(TopicsRoutes)]
})
export class TopicsRoutingModule {}
