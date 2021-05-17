import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {  Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';
import { tagName } from '../config/app.config';

@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.css']
})
export class MessageStreamComponent implements OnInit, OnDestroy {



  messages: string[];

  private destroy$ = new Subject();

  constructor(
    private rxStompService: RxStompService) {   
  }

  ngOnInit(): void {
    this.messages = [];

    this.rxStompService.watch('/topic/'+tagName)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((message: Message) => {      
        this.messages.push(message.body);
        this.messages = this.messages.slice(-5);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }





}
