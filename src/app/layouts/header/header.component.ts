import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import APP from '../../common/constants/app.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  brandName = APP.NAME;
  collapsed = true;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.collapsed = true;
      }
    });
  }
}
