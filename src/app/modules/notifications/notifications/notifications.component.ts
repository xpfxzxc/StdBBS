import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";
import { TitleService } from "../../../services/title.service";
import { Pagination } from "../../../common/modals/pagination";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent implements OnInit {
  page: number;
  pageSize = 10;
  pagination: Pagination<Notification>;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: TitleService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: {
        page: number;
        userNotificationsPagination: Pagination<Notification>;
      }) => {
        this.page = data.page;
        this.pagination = data.userNotificationsPagination;
      }
    );
    this.titleService.setTitle("我的通知");
    this.authService.user.notificationCount = 0;
  }

  onPageChange(page: number) {
    this.router.navigate([], { queryParams: { page } });
  }
}
