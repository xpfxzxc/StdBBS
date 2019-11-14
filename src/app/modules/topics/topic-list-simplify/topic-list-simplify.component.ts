import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '../topic';

@Component({
  selector: 'app-topic-list-simplify',
  templateUrl: './topic-list-simplify.component.html',
  styleUrls: ['./topic-list-simplify.component.scss']
})
export class TopicListSimplifyComponent implements OnInit {
  @Input() topics: Topic[] = [];

  ngOnInit() {}
}
