import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

import { WebService } from "../web.service";
import { Message } from "./message.model";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  // messages: Message[];
  // messages = [
  //   {
  //     text: "some text",
  //     owner: "Tim"
  //   },
  //   {
  //     text: "other message",
  //     owner: "Jane"
  //   }
  // ];
  constructor(private webService: WebService, private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
    // this.webService.messages.subscribe(messages => {
    //   this.messages = messages;
    // });
  }
}
