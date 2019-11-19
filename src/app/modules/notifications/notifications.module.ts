import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NotificationsRoutingModule } from "./notifications-routing.module";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationsResolverService } from "./notifications/notifications-resolver.service";
import { TopicRepliedComponent } from "./topic-replied/topic-replied.component";
import { SharedModule } from "../../shared/shared.module";
import { NotificationListComponent } from './notification-list/notification-list.component';

@NgModule({
  declarations: [NotificationsComponent, TopicRepliedComponent, NotificationListComponent],
  imports: [CommonModule, NotificationsRoutingModule, SharedModule],
  providers: [NotificationsResolverService]
})
export class NotificationsModule {}
