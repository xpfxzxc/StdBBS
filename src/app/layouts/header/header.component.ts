import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";

import APP from "../../common/constants/app.constant";
import { AuthService } from "../../modules/auth/auth.service";
import { Category } from "../../modules/categories/category";
import { CategoryService } from "../../modules/categories/category.service";
import { CheckService } from "../../services/generic/check.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  brandName = APP.NAME;
  categories: Category[];
  collapsed = true;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private readonly checkService: CheckService,
    private readonly router: Router
  ) {}

  logout() {
    if (window.confirm("您确定要退出吗？")) {
      this.authService.logout().subscribe();
    }
  }

  ngOnInit() {
    this.checkService.isLoggedIn().subscribe(user => {
      this.authService.set(user);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.collapsed = true;
      }
    });

    this.categories = this.categoryService.categories;
  }

  get user() {
    return this.authService.user;
  }
}
