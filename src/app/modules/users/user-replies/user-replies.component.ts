import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Reply } from "../../replies/reply";
import { ReplyService } from "../../replies/reply.service";
import { Pagination } from "../../../common/modals/pagination";

@Component({
  selector: "app-user-replies",
  templateUrl: "./user-replies.component.html",
  styleUrls: ["./user-replies.component.scss"]
})
export class UserRepliesComponent implements OnInit {
  page = 1;
  pageSize = 5;

  private pagination: Pagination<Reply>;
  private userId: number;

  constructor(
    private readonly replyService: ReplyService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = +paramMap.get("id");
      this.loadUserTopics();
    });
  }

  onPageChange(page: number) {
    this.page = page;

    this.loadUserTopics();
  }

  loadUserTopics() {
    this.replyService
      .fetchUserReplies(this.userId, { page: this.page })
      .subscribe(pagination => {
        this.pagination = pagination;
      });
  }

  get totalUserReplies() {
    return this.pagination ? this.pagination.totalItems : 0;
  }

  get userReplies() {
    return this.pagination ? this.pagination.items : [];
  }
}
