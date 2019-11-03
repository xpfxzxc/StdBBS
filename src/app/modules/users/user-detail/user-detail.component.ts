import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private readonly route: ActivatedRoute, private readonly titleService: TitleService) {}

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      this.titleService.setTitle(`${this.user.name} 的个人中心`);
    });
  }
}
