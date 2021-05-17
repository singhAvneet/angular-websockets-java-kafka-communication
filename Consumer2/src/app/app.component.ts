import { Component, ViewEncapsulation, Injectable } from '@angular/core';
import { tagName } from './config/app.config';

@Component({
  selector: tagName,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
@Injectable()
export class AppComponent {
  
}
