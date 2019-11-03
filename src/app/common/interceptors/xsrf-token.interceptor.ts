import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

import { JsonResponse } from '../modals/json-response';
import { XsrfTokenService } from '../../services/xsrf-token.service';

@Injectable()
export class XsrfTokenInterceptor implements HttpInterceptor {
  constructor(private readonly http: HttpClient, private readonly xsrfTokenService: XsrfTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const includedMethods = ['POST', 'PATCH', 'DELETE'];

    if (!includedMethods.includes(req.method)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      flatMap(event => {
        if (event instanceof HttpResponse && (event.body as JsonResponse).code === -4031) {
          return this.xsrfTokenService.fetch().pipe(
            flatMap(() => {
              return this.http.request(req.method, req.url, { body: req.body, observe: 'events' });
            })
          );
        }

        return of(event);
      })
    );
  }
}
