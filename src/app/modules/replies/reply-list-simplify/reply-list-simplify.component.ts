import { Component, Input, OnInit } from "@angular/core";

import { Reply } from "../reply";

@Component({
  selector: "app-reply-list-simplify",
  templateUrl: "./reply-list-simplify.component.html",
  styleUrls: ["./reply-list-simplify.component.scss"]
})
export class ReplyListSimplifyComponent implements OnInit {
  @Input() replies: Reply[] = [];

  constructor() {}

  ngOnInit() {}
}
