import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AddTopicBody } from "./interfaces/add-topic-body.interface";
import { UpdateTopicBody } from "./interfaces/update-topic-body.interface";
import { Topic } from "./topic";
import APP from "../../common/constants/app.constant";
import { JsonResponse } from "../../common/modals/json-response";
import { Pagination } from "../../common/modals/pagination";

const topicsBaseUrl = `${APP.API_BASE_URL}/topics`;

declare interface FetchTopicsParams {
  categoryId?: number;
  page?: number;
  order?: "recent" | string;
}

declare interface FetchUserTopicsParams {
  page?: number;
}

@Injectable({
  providedIn: "root"
})
export class TopicService {
  constructor(private readonly http: HttpClient) {}

  addTopic(body: AddTopicBody): Observable<Topic> {
    return this.http
      .post<JsonResponse>(topicsBaseUrl, body)
      .pipe(map(res => (res.code === 0 ? new Topic(res.data["topic"]) : null)));
  }

  deleteTopic(id: number): Observable<boolean> {
    return this.http
      .delete<JsonResponse>(`${topicsBaseUrl}/${id}`)
      .pipe(map(res => res.code === 0));
  }

  fetchTopicById(id: number): Observable<Topic> {
    return this.http
      .get<JsonResponse>(`${topicsBaseUrl}/${id}`)
      .pipe(map(res => (res.code === 0 ? new Topic(res.data["topic"]) : null)));
  }

  fetchTopics(
    params: FetchTopicsParams = { page: 1, order: "default" }
  ): Observable<Pagination<Topic>> {
    const { categoryId, page, order } = params;
    return this.http
      .get<JsonResponse>(topicsBaseUrl, {
        params: {
          ...(categoryId && { categoryId: `${categoryId}` }),
          ...(order && { order }),
          page: `${page}`
        }
      })
      .pipe(map(res => (res.code === 0 ? res.data["topics"] : null)));
  }

  fetchUserTopics(
    userId: number,
    params: FetchUserTopicsParams = { page: 1 }
  ): Observable<Pagination<Topic>> {
    const { page } = params;
    return this.http
      .get<JsonResponse>(`${APP.API_BASE_URL}/users/${userId}/topics`, {
        params: {
          page: `${page}`
        }
      })
      .pipe(map(res => (res.code === 0 ? res.data["userTopics"] : null)));
  }

  updateTopic(id: number, body: UpdateTopicBody): Observable<boolean> {
    return this.http
      .patch<JsonResponse>(`${topicsBaseUrl}/${id}`, body)
      .pipe(map(res => res.code === 0));
  }
}
