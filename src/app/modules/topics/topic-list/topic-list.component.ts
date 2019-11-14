import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '../topic';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  @Input() topics: Topic[] = [];

  ngOnInit() {}
}
