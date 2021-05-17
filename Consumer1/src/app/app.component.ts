import { Component, ViewEncapsulation } from '@angular/core';
import { tagName } from './config/app.config';

@Component({
  selector: tagName,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  
}
