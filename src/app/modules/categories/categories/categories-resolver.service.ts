import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { CategoryService } from '../category.service';
import { Topic } from '../../topics/topic';
import { TopicService } from '../../topics/topic.service';
import { Pagination } from '../../../common/modals/pagination';

@Injectable()
export class CategoriesResolverService implements Resolve<Pagination<Topic>> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly topicService: TopicService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Topic>> | Observable<never> {
    const page = +route.queryParamMap.get('page') || 1;
    const id = +route.paramMap.get('id');
    const order = route.queryParamMap.get('order') || null;

    if (page <= 0 || id <= 0 || id > this.categoryService.categories.length) {
      this.router.navigateByUrl('/topics');
      return EMPTY;
    }

    const title = this.categoryService.categories[id - 1].name;
    route.data = { ...route.data, page, id, title, order };

    return this.topicService.fetchTopics({ page, categoryId: id, order }).pipe(
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
