import { Component, Input, OnInit } from "@angular/core";

import { Notification } from "../notification";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"]
})
export class NotificationListComponent implements OnInit {
  @Input() notifications: Notification[] = [];

  constructor() {}

  ngOnInit() {}
}
