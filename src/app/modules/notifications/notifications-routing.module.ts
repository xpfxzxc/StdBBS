import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationsResolverService } from "./notifications/notifications-resolver.service";
import { AuthenticatedGuard } from "../auth/authenticated.guard";

const routes: Routes = [
  {
    path: "",
    component: NotificationsComponent,
    canActivate: [AuthenticatedGuard],
    resolve: {
      userNotificationsPagination: NotificationsResolverService
    },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
