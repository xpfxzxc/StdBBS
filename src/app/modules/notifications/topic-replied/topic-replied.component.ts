import { Component, Input, OnInit } from "@angular/core";

import { Notification } from "../notification";

@Component({
  selector: "notification-topic-replied",
  templateUrl: "./topic-replied.component.html",
  styleUrls: ["./topic-replied.component.scss"]
})
export class TopicRepliedComponent implements OnInit {
  @Input() notification: Notification;

  constructor() {}

  ngOnInit() {}
}
