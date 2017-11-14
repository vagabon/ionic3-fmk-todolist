import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Directive pour le contenu scrollable.
 */
@Component({
  selector: 'app-content-scroll',
  template: `
    <div class="content-scrool-flex">
      <div style="margin: 20px auto; position: absolute; width: 100%; text-align: center; color: white;" *ngIf="loading === false && list && list.length == 0">
        {{notFound}}
      </div>
      <ng-content></ng-content>
      <div style="margin: 0 5px; width: 100%; text-align: center;">
        <ion-spinner name="bubbles" color="secondary" *ngIf="loading"></ion-spinner>
        <button ion-button small color="secondary" (click)="doLoadMore()" *ngIf="loading === false && ((list && list.length > 0 && list.length % 10 == 0) || (search == '' && searchEmpty))">
          <ion-icon name="ios-arrow-down"></ion-icon>
        </button>
      </div>
    </div>
  `
})
export class ContentScrollDirective {

  @Input() notFound: string = '';
  @Input() search: string = '';
  @Input() searchEmpty: boolean = false;
  @Input() loading: boolean = false;
  @Input() list: Array<any>;
  @Output() loadMoreEmitter = new EventEmitter();

  constructor() {
  }

  doLoadMore() {
    this.loadMoreEmitter.next();
  }
}
