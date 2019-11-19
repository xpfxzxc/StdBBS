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
import { AuthService } from "../../auth/auth.service";

@Injectable()
export class TopicEditResolverService implements Resolve<Topic> {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly topicService: TopicService
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
        if (!topic) {
          this.router.navigateByUrl("/topics");
          return EMPTY;
        } else if (!this.authService.user.isAuthorOf(topic)) {
          this.router.navigate(["/topics", id]);
          return EMPTY;
        } else {
          return of(topic);
        }
      })
    );
  }
}
