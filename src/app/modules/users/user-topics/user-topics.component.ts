import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { Topic } from "../../topics/topic";
import { TopicService } from "../../topics/topic.service";
import { Pagination } from "../../../common/modals/pagination";

@Component({
  selector: "app-user-topics",
  templateUrl: "./user-topics.component.html",
  styleUrls: ["./user-topics.component.scss"]
})
export class UserTopicsComponent implements OnInit {
  page = 1;
  pageSize = 5;

  private pagination: Pagination<Topic>;
  private userId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly topicService: TopicService
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
    this.topicService
      .fetchUserTopics(this.userId, { page: this.page })
      .subscribe(pagination => {
        this.pagination = pagination;
      });
  }

  get totalUserTopics() {
    return this.pagination ? this.pagination.totalItems : 0;
  }

  get userTopics() {
    return this.pagination ? this.pagination.items : [];
  }
}
