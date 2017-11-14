import {Component, Input} from '@angular/core';

/**
 * Directive permettant d'afficher des données suplémentaire.
 */
@Component({
  selector: 'show-more',
  template: `
      <button ion-button full color="secondary" (click)="doOpen()" style="padding: 0; margin: 0; border-top: 1px solid white;">
        <ion-icon [name]="!showMore ? 'ios-arrow-down' : 'ios-arrow-up'" style="left: 10px; position: absolute;"></ion-icon>
        {{!showMore ? text1 : text2 != '' ? text2 : text1}}
        <ion-icon [name]="!showMore ? 'ios-arrow-down' : 'ios-arrow-up'" style="right: 10px; position: absolute;"></ion-icon>
      </button>
      <div [style.display]="showMore ? '' : 'none'" style="width: 100%; text-align: center; background: rgba(128, 128, 128, 0.1);" *ngIf="!force || (force && showMore)">
        <ng-content></ng-content>        
      </div>
  `
})
export class ShowMoreDirective {

  @Input() text1: string = '';
  @Input() text2: string= '';
  @Input() force: boolean= false;
  @Input() showMore:boolean = false;

  constructor() {
  }

  doOpen() {
    this.showMore = !this.showMore;
    this.force = false;
  }

}
