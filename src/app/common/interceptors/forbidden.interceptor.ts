import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonResponse } from '../modals/json-response';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const res: JsonResponse = event.body;
          if (res.code === -403) {
            this.authService.user = null;
            this.router.navigateByUrl('/login');
          }
        }
        return event;
      })
    );
  }
}
