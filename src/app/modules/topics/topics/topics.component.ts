import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from '../topic';
import { Pagination } from '../../../common/modals/pagination';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  order: string;
  page: number;
  pageSize = 20;
  pagination: Pagination<Topic>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: TitleService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { title: string; order: string; page: number; topicPagination: Pagination<Topic> }) => {
        this.page = data.page;
        this.order = data.order;
        this.pagination = data.topicPagination;

        this.titleService.setTitle(data.title);
      }
    );
  }

  onPageChange(page: number) {
    this.router.navigate([], { queryParams: { page, order: this.order } });
  }
}
