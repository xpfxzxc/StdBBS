import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";

import { TopicService } from "../topic.service";
import { AlertService } from "../../alert/alert.service";
import { CategoryService } from "../../categories/category.service";
import APP from "../../../common/constants/app.constant";
import { TitleService } from "../../../services/title.service";
import { Topic } from "../topic";

@Component({
  selector: "app-topic-create-and-edit",
  templateUrl: "./topic-create-and-edit.component.html",
  styleUrls: ["./topic-create-and-edit.component.scss"]
})
export class TopicCreateAndEditComponent implements OnInit {
  body: string;
  submitting = false;
  title = "";
  topicCreateAndEditForm = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(2)]],
    categoryId: [null, [Validators.required]],
    body: ["", [Validators.required, Validators.minLength(3)]]
  });
  uploadEndpoint = `${APP.API_BASE_URL}/uploads/images/topics`;

  private id: number;

  addOrUpdate() {
    const body = this.topicCreateAndEditForm.value;
    body.categoryId = +body.categoryId;

    this.submitting = true;

    if (this.id === undefined) {
      this.topicService
        .addTopic(body)
        .pipe(finalize(() => (this.submitting = false)))
        .subscribe(topic => {
          if (topic) {
            this.alertService.success("帖子创建成功！");
            this.router.navigate(["/topics", topic.id]);
          }
        });
    } else {
      this.topicService
        .updateTopic(this.id, body)
        .pipe(finalize(() => (this.submitting = false)))
        .subscribe(successful => {
          if (successful) {
            this.alertService.success("帖子编辑成功！");
            this.router.navigate(["/topics", this.id]);
          }
        });
    }
  }

  beforeUpload(file: File) {
    return file.size / 2 ** 20 < 2;
  }

  constructor(
    private readonly alertService: AlertService,
    private readonly categoryService: CategoryService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly topicService: TopicService
  ) {}

  get f() {
    return this.topicCreateAndEditForm.controls;
  }

  ngOnInit() {
    this.categoryService.load();

    this.route.data.subscribe(
      (data: { id?: number; title: string; topic?: Topic }) => {
        this.id = data.id;

        this.title = data.title;
        this.titleService.setTitle(this.title);

        const topic = data.topic;
        if (topic) {
          this.f.title.setValue(topic.title);
          this.f.categoryId.setValue(topic.category.id);
          this.f.body.setValue(topic.body);
          this.body = topic.body;
        }
      }
    );
  }

  onBodyChange(content: string) {
    const body = this.f.body as FormControl;
    body.setValue(content);
    this.topicCreateAndEditForm.markAsDirty();
  }
}
