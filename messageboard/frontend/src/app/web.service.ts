import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Message } from "./message/message.model";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WebService {
  BASE_URL = "http://localhost:3000/api";
  private messageStore: Message[] = [];
  private messageSubject = new Subject<Message[]>();

  messages = this.messageSubject.asObservable();

  constructor(private http: HttpClient, private sb: MatSnackBar) {
    this.getMessages("");
  }

  getMessages(user) {
    user = user ? "/" + user : "";
    this.http.get<Message[]>(this.BASE_URL + "/messages" + user).subscribe(
      response => {
        this.messageStore = response;
        this.messageSubject.next(this.messageStore);
      },
      error => {
        this.handleError("Unable to get messages");
      }
    );
  }

  postMessage(message) {
    this.http.post<Message>(this.BASE_URL + "/messages", message).subscribe(
      response => {
        this.messageStore.push(response);
        this.messageSubject.next(this.messageStore);
      },
      error => {
        this.handleError("Unable to post messages");
      }
    );
  }

  getUser() {
    return this.http
      .get(this.BASE_URL + "users/me")
      .pipe(map(res => res.json()));
  }

  private handleError(error) {
    console.error(error);
    this.sb.open(error, "close", { duration: 5000 });
  }
}
