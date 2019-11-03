import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { User } from '../user';
import { UserService } from '../user.service';

@Injectable()
export class UserDetailResolverService implements Resolve<User> {
  constructor(private readonly userService: UserService, private readonly router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    const id = parseInt(route.paramMap.get('id'));

    return this.userService.fetchUserById(id).pipe(
      take(1),
      mergeMap(user => {
        if (user) {
          return of(user);
        } else {
          this.router.navigateByUrl('/users');
          return EMPTY;
        }
      })
    );
  }
}
