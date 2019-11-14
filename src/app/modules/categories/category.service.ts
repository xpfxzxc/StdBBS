import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from './category';
import APP from '../../common/constants/app.constant';
import { JsonResponse } from '../../common/modals/json-response';

const categoriesBaseUrl = `${APP.API_BASE_URL}/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[];

  constructor(private readonly http: HttpClient) {}

  load(): Promise<any> {
    return this.fetchCategories().toPromise();
  }

  private fetchCategories(): Observable<void> {
    return this.http
      .get<JsonResponse>(categoriesBaseUrl)
      .pipe(map(res => (this.categories = res.code === 0 ? res.data['categories'] : null)));
  }
}
