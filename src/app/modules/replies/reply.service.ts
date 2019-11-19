import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AddReplyBody } from "./interfaces/add-reply-body.interface";
import { Reply } from "./reply";
import APP from "../../common/constants/app.constant";
import { JsonResponse } from "../../common/modals/json-response";
import { Pagination } from "../../common/modals/pagination";

const repliesBaseUrl = `${APP.API_BASE_URL}/replies`;

declare interface FetchUserRepliesParams {
  page?: number;
}

@Injectable({
  providedIn: "root"
})
export class ReplyService {
  constructor(private readonly http: HttpClient) {}

  addReply(body: AddReplyBody) {
    return this.http
      .post<JsonResponse>(repliesBaseUrl, body)
      .pipe(map(res => (res.code === 0 ? new Reply(res.data["reply"]) : null)));
  }

  deleteTopic(id: number): Observable<boolean> {
    return this.http
      .delete<JsonResponse>(`${repliesBaseUrl}/${id}`)
      .pipe(map(res => res.code === 0));
  }

  fetchTopicReplies(topicId: number): Observable<Reply[]> {
    return this.http
      .get<JsonResponse>(`${APP.API_BASE_URL}/topics/${topicId}/replies`)
      .pipe(map(res => (res.code === 0 ? res.data["topicReplies"] : null)));
  }

  fetchUserReplies(
    userId: number,
    params: FetchUserRepliesParams = { page: 1 }
  ): Observable<Pagination<Reply>> {
    const { page } = params;
    return this.http
      .get<JsonResponse>(`${APP.API_BASE_URL}/users/${userId}/replies`, {
        params: {
          page: `${page}`
        }
      })
      .pipe(map(res => (res.code === 0 ? res.data["userReplies"] : null)));
  }
}
