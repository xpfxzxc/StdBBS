import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { Topic } from "../topic";
import { TopicService } from "../topic.service";

@Injectable()
export class TopicDetailResolverService implements Resolve<Topic> {
  constructor(
    private readonly topicService: TopicService,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Topic> | Observable<never> {
    const id = parseInt(route.paramMap.get("id"));
    route.data = { ...route.data, id };

    return this.topicService.fetchTopicById(id).pipe(
      take(1),
      mergeMap(topic => {
        if (topic) {
          return of(topic);
        } else {
          this.router.navigateByUrl("/topics");
          return EMPTY;
        }
      })
    );
  }
}
