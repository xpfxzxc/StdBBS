import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AddUserBody } from './interfaces/add-user-body.interface';
import { User } from './user';
import APP from '../../common/constants/app.constant';
import { JsonResponse } from '../../common/modals/json-response';

const usersBaseUrl = `${APP.API_BASE_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  addUser(body: AddUserBody): Observable<User> {
    return this.http.post<JsonResponse>(usersBaseUrl, body).pipe(map(res => new User(res.data['user'])));
  }

  constructor(private readonly http: HttpClient) {}
}
