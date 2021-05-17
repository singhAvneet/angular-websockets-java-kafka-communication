import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessageStreamComponent } from './message-stream/message-stream.component';
import  { createCustomElement } from '@angular/elements';
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
   providers: [],
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
