import {Component, Input} from '@angular/core';

/**
 * Directive pour l'image au dessus du contenu scrollable.
 */
@Component({
  selector: 'app-expandable-image',
  template: `
    <img src="{{img}}" alt="{{altImg}}" *ngIf="img && img != ''">
    <div class="expandable-header-page" [style.minHeight]="heightHeader + 'px'" ></div>
  `
})
export class ExpendableImageDirective {

  @Input() img: string;
  @Input() altImg: string;
  @Input() heightHeader: number = 180;

  constructor() {
  }
}
