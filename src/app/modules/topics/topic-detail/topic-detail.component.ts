import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../topic";
import { TopicService } from "../topic.service";
import { AlertService } from "../../alert/alert.service";
import { AuthService } from "../../auth/auth.service";
import { TitleService } from "../../../services/title.service";

@Component({
  selector: "app-topic-detail",
  templateUrl: "./topic-detail.component.html",
  styleUrls: ["./topic-detail.component.scss"]
})
export class TopicDetailComponent implements OnInit {
  topic: Topic;

  constructor(
    public readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly topicService: TopicService
  ) {}

  deleteTopic() {
    if (!confirm("您确定要删除吗？")) {
      return;
    }

    this.topicService.deleteTopic(this.topic.id).subscribe(successful => {
      if (successful) {
        this.alertService.success("成功删除帖子！");
        this.router.navigateByUrl("/topics");
      }
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: { topic: Topic }) => {
      this.topic = data.topic;
      this.titleService.setTitle(this.topic.title);
    });
  }
}
