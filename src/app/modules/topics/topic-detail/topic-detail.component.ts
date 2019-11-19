import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../topic";
import { TopicService } from "../topic.service";
import { AlertService } from "../../alert/alert.service";
import { AuthService } from "../../auth/auth.service";
import { Reply } from "../../replies/reply";
import { ReplyService } from "../../replies/reply.service";
import { Scroller } from "../../../services/scroller.service";
import { TitleService } from "../../../services/title.service";

@Component({
  selector: "app-topic-detail",
  templateUrl: "./topic-detail.component.html",
  styleUrls: ["./topic-detail.component.scss"]
})
export class TopicDetailComponent implements OnInit {
  topic: Topic;
  replies: Reply[] = [];

  constructor(
    private readonly alertService: AlertService,
    public readonly authService: AuthService,
    private readonly replyService: ReplyService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly scroller: Scroller,
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
    this.route.data.subscribe((data: { id: number; topic: Topic }) => {
      this.topic = data.topic;
      this.titleService.setTitle(this.topic.title);

      this.replyService.fetchTopicReplies(data.id).subscribe(replies => {
        this.replies = replies;

        this.route.fragment.subscribe(fragment => {
          if (fragment) {
            const replyId = +fragment.replace(/\D/g, "");
            this.scrollIntoViewOnNextTick(replyId);
          }
        });
      });
    });
  }

  onAddReply(reply: Reply) {
    this.topic.replyCount++;
    this.replies.push(reply);
    this.scrollIntoViewOnNextTick(reply.id);
  }

  onDeleteReply(reply: Reply) {
    this.alertService.success("成功删除评论", { autoHide: true });
    this.router.navigate(["/topics", this.topic.id]);
  }

  private scrollIntoViewOnNextTick(replyId: number) {
    setTimeout(() => {
      this.scroller.visit(`#reply${replyId}`, { behavior: "smooth" });
    }, 0);
  }
}
