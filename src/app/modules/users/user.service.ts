import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AddUserBody } from './interfaces/add-user-body.interface';
import { UpdateUserBody } from './interfaces/update-user-body.interface';
import { User } from './user';
import APP from '../../common/constants/app.constant';
import { JsonResponse } from '../../common/modals/json-response';

const usersBaseUrl = `${APP.API_BASE_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  addUser(body: AddUserBody): Observable<User> {
    return this.http
      .post<JsonResponse>(usersBaseUrl, body)
      .pipe(map(res => (res.code === 0 ? new User(res.data['user']) : null)));
  }

  constructor(private readonly http: HttpClient) {}

  fetchUserById(id: number): Observable<User> {
    return this.http
      .get<JsonResponse>(`${usersBaseUrl}/${id}`)
      .pipe(map(res => (res.code === 0 ? new User(res.data['user']) : null)));
  }

  updateUser(id: number, body: UpdateUserBody): Observable<boolean> {
    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));
    return this.http.patch<JsonResponse>(`${usersBaseUrl}/${id}`, formData).pipe(map(res => res.code === 0));
  }
}
