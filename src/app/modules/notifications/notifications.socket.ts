import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root"
})
export class NotificationsSocket extends Socket {
  constructor() {
    super({
      url: "http://localhost:3000/notifications",
      options: {
        autoConnect: false,
        transport: ["websocket", "polling"]
      }
    });
  }
}
