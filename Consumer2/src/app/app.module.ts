import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessageStreamComponent } from './message-stream/message-stream.component';
import  { createCustomElement } from '@angular/elements';

import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './config/rx-stomp.config';
import { tagName } from './config/app.config';

@NgModule({
   declarations: [
      AppComponent,
      MessageStreamComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      {
         provide: InjectableRxStompConfig,
         useValue: myRxStompConfig
      },
      {
         provide: RxStompService,
         useFactory: rxStompServiceFactory,
         deps: [InjectableRxStompConfig]
      }
   ],
   bootstrap: [ ],
   entryComponents:[AppComponent],
})
export class AppModule implements DoBootstrap{
   constructor(private injector: Injector) {
     const element = createCustomElement(AppComponent, { injector:this.injector });
     if (!customElements.get(tagName)) {
      customElements.define(tagName , element);
     }
  
     }
 
   ngDoBootstrap() {
 
   }
  }
