import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import APP from '../../common/constants/app.constant';
import { AuthService } from '../../modules/auth/auth.service';
import { User } from '../../modules/users/user';
import { CheckService } from '../../services/generic/check.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  brandName = APP.NAME;
  collapsed = true;

  constructor(
    private authService: AuthService,
    private readonly checkService: CheckService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe();
  }

  ngOnInit() {
    this.checkService.isLoggedIn().subscribe(user => {
      this.authService.user = user;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.collapsed = true;
      }
    });
  }

  get user() {
    return this.authService.user;
  }
}
