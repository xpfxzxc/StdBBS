import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, of, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { User } from '../user';
import { UserService } from '../user.service';

@Injectable()
export class UserEditResolverService {
  constructor(private readonly router: Router, private readonly userService: UserService) {}

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
