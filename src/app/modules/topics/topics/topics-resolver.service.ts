import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Topic } from '../topic';
import { TopicService } from '../topic.service';
import { Pagination } from '../../../common/modals/pagination';

@Injectable()
export class TopicsResolverService implements Resolve<Pagination<Topic>> {
  constructor(private readonly topicService: TopicService, private readonly router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Topic>> | Observable<never> {
    const page = +route.queryParamMap.get('page') || 1;
    const order = route.queryParamMap.get('order') || null;
    route.data = { ...route.data, page, order };

    if (page < 0) {
      this.router.navigateByUrl('/topics');
      return EMPTY;
    }

    return this.topicService.fetchTopics({ page, order }).pipe(
      take(1),
      mergeMap(pagination => {
        if (pagination.itemCount > 0 || page === 1) {
          return of(pagination);
        } else {
          this.router.navigateByUrl('/topics');
          return EMPTY;
        }
      })
    );
  }
}
