import {Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {NavController} from "ionic-angular";
import {FacebookServiceProvider} from "../../providers/facebook-service/facebook-service";
import {ConfigFmkServiceProvider} from "../../providers/config-fmk-service/config-fmk-service";
import {Platform} from "ionic-angular/platform/platform";

@Component({
  selector: 'expandable-header',
  template: `
    <div class="responsiveHeader">      
      <ion-navbar>
        <img src="assets/icon/logo.png" class="logo">
        <ion-title style="display: none;">CinéTchiCha : {{title | translate}}</ion-title>
        <div class="ion-title title title-md"><div class="toolbar-title toolbar-title-md" ng-reflect-klass="toolbar-title" ng-reflect-ng-class="toolbar-title-md">{{title | translate}}</div></div>
        <ion-buttons end style="display: flex; justify-content: center; align-items: center;">
          <button ion-button smal (click)="doShare()" style="background: #4267b2; max-height: 20px;"><ion-icon name="logo-facebook"></ion-icon></button>
          <button ion-button (click)="doClose()" *ngIf="close">
            <ion-icon name="close" item-start></ion-icon>
          </button>
          <button ion-button (click)="doParam($event)" *ngIf="!close">
            <ion-icon name="options" item-start></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
      <ion-searchbar *ngIf="searchEmitter.observers.length > 0" [(ngModel)]="search" (ionInput)="doSearch($event)" (ionCancel)="doSearch($event)" (ionClear)="doSearch($event)" placeholder="Rechercher"></ion-searchbar>      
      <ng-content></ng-content>      
    </div>
  `
})
export class ExpandableHeaderDirective implements OnInit, DoCheck {

  @Input() headerHeight: number;
  @Input() title: string;
  @Input() search: string;
  @Output() searchEmitter = new EventEmitter();
  @Output() searchChangeEmitter = new EventEmitter();
  @Input() close: boolean;
  @Input() nbItems: number = 1;

  baseHeigth: number = 0;
  newHeaderHeight: number = 0;
  swipeCoord: [number, number] = [0, 0];
  scrollTop: number = 0;
  hide: boolean = false;

  constructor(protected navCtrl: NavController, public element: ElementRef, public renderer: Renderer2, private facebookService: FacebookServiceProvider,
              private configService:ConfigFmkServiceProvider, private platform:Platform) {
  }

  ngOnInit(){
    this.baseHeigth = this.element.nativeElement.offsetHeight;
    this.calculateHeigth();
    this.initHeigth(this.headerHeight);
    this.doScrollContentFlex();
  }

  ngDoCheck(): void {
    this.doScrollContentFlex();
  }

  scrollFlexTop = 0;

  private doScrollContentFlex() {
    let ionScroll = this.element.nativeElement.parentNode.getElementsByClassName("scroll-content");
    for (var i = 0; i < ionScroll.length; i++) {
      if (!ionScroll[i].hasAttribute('done')) {
        ionScroll[i].setAttribute('done', 'true');
        let doEvent = (event) => {
          if (!this.hide) {
            event.preventDefault();
            if (!this.platform.is('cordova')) {
              event.srcElement.scrollTo(0, 0);
            }
            this.scrollFlexTop = 0;
          }
        };
        let doEventScrool = (event) => {
          doEvent(event);
          if (this.hide) {
            this.scrollFlexTop = event.srcElement.scrollTop;
          }
        }
        ionScroll[i].removeEventListener('scroll', doEventScrool);
        ionScroll[i].addEventListener('scroll', doEventScrool);
        ionScroll[i].removeEventListener('touchmove', doEvent);
        ionScroll[i].addEventListener('touchmove', doEvent);
      }
    }
    let contentScrool = this.element.nativeElement.parentNode.getElementsByClassName("scroll-content");
    if (contentScrool && contentScrool.length > 0) {
      if (!contentScrool[0].hasAttribute('done')) {
        contentScrool[0].setAttribute('done', 'true');
        contentScrool[0].addEventListener('touchstart', (event) => {
          this.swipe(event, 'start');
        });
        contentScrool[0].addEventListener('touchend', (event) => {
          this.swipe(event, 'end');
        });
        contentScrool[0].addEventListener('wheel', (event) => {
          this.resizeHeader((this.baseHeigth * (event.deltaY > 0 ? 1 : -1)));
        });
      }
    }
  }

  swipe(event, when: string): void {
    const coord: [number, number] = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
    if (when === 'start') {
      this.swipeCoord = coord;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      let scrollTop = Math.floor((direction[1] * -1));
      let element = event.target;
      let canSlide = true;
      while (element.parentElement) {
        if (element.id == "map") {
          canSlide = false;
          break;
        }
        if (element.classList.contains("ion-page")) {
          break;
        }
        element = element.parentElement;
      }

      if (canSlide && (scrollTop > 5 || scrollTop < -5) && !(Math.abs(direction[1]) < Math.abs(direction[0]) && Math.abs(direction[0]) > 30)) {
        if (scrollTop < this.baseHeigth && scrollTop > 0) {
          scrollTop = this.baseHeigth;
        }
        this.resizeHeader(scrollTop);
      }
    }
  }

  calculateHeigth() {
    let multiplicator = this.nbItems;
    if (this.searchEmitter.observers.length > 0 && multiplicator <= 2) {
      this.nbItems = 2;
      multiplicator = 2;
    }
    if (this.nbItems == 3 && this.search != '') {
      multiplicator = 2;
    }
    this.headerHeight = this.baseHeigth * multiplicator;
  }

  private initHeigth(heigth: number) {
    this.renderer.setStyle(this.element.nativeElement, 'height', heigth + 'px');
    if (document.getElementById("fb-like")) {
      this.renderer.setStyle(document.getElementById("fb-like"), 'height', heigth + 'px');
    }
    if (document.getElementsByClassName("fb-like")) {
      if (document.getElementsByClassName("fb-like")[0] && document.getElementsByClassName("fb-like")[0].getElementsByTagName("iframe")[0]) {
        this.renderer.setStyle(document.getElementsByClassName("fb-like")[0].getElementsByTagName("iframe")[0], 'height',
          this.baseHeigth - heigth > 10 ? 0 : heigth + 'px');
      }
    }
    let expandableheaderPage = this.element.nativeElement.parentNode.getElementsByClassName("content-md");
    if (expandableheaderPage && expandableheaderPage.length > 0) {
      this.renderer.setStyle(expandableheaderPage[0], 'margin-top', heigth + 'px');
      this.renderer.setStyle(expandableheaderPage[0], 'height',     'calc(100% - ' + heigth + 'px)');
    }
  }

  resizeHeader2(scrollTop){
    if (this.scrollFlexTop > 0) {
      return;
    }
    this.calculateHeigth();
    this.scrollTop += scrollTop;
    if (this.scrollTop < 0) {
      this.scrollTop = 0;
    }
    this.newHeaderHeight = Math.floor(this.headerHeight - (this.scrollTop));
    if(this.newHeaderHeight < 0){
      this.newHeaderHeight = 0;
    }
    if(this.newHeaderHeight > this.headerHeight){
      this.newHeaderHeight = this.headerHeight;
      this.scrollTop = 0;
    }
    // on diminue l'image sous le header
    if (this.element.nativeElement.parentNode.getElementsByClassName("expandable-header-page")) {
      let expandableheaderPage = this.element.nativeElement.parentNode.getElementsByClassName("expandable-header-page");
      if (expandableheaderPage && expandableheaderPage.length > 0) {
        let minHeight = expandableheaderPage[0].getAttribute('minHeight');
        if (!minHeight) {
          minHeight = expandableheaderPage[0].offsetHeight;
          expandableheaderPage[0].setAttribute('minHeight', minHeight);
        }
        let min = parseInt(minHeight ? minHeight : 180);
        let number = this.newHeaderHeight == 0 ? (min - (this.scrollTop - this.headerHeight)) : min;
        if (number < 0) {
          number = 0;
          this.scrollTop -= scrollTop;
          this.hide = true;
        } else {
          this.hide = false;
        }
        this.renderer.setStyle(expandableheaderPage[0], 'min-height', number + 'px');
      } else {
        if (this.newHeaderHeight <= 0) {
          this.hide = true;
        } else {
          this.hide = false;
        }
      }
    }
    this.initHeigth(this.newHeaderHeight);
  }

  resizeHeader(scrollTop) {
    if (this.scrollFlexTop > 0) {
      return;
    }
    this.calculateHeigth();
    this.scrollTop += scrollTop;
    if (this.scrollTop < 0) {
      this.scrollTop = 0;
    }
    let min = 0;
    let number = 0;
    // on diminue l'image sous le header
    if (this.element.nativeElement.parentNode.getElementsByClassName("expandable-header-page")) {
      let expandableheaderPage = this.element.nativeElement.parentNode.getElementsByClassName("expandable-header-page");
      if (expandableheaderPage && expandableheaderPage.length > 0) {
        let minHeight = expandableheaderPage[0].getAttribute('minHeight');
        if (!minHeight) {
          minHeight = expandableheaderPage[0].offsetHeight;
          expandableheaderPage[0].setAttribute('minHeight', minHeight);
        }
        min = parseInt(minHeight ? minHeight : 180);
        number = min - (this.scrollTop);
        if (number < 0) {
          number = 0;
        }
        this.renderer.setStyle(expandableheaderPage[0], 'min-height', number + 'px');
      }
    }
    if (number == 0) {
      let diff = this.scrollTop - min;
      if (diff < 30) {
        this.scrollTop += diff;
        diff = 0;
      }
      this.newHeaderHeight = Math.floor(this.headerHeight - diff);
      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
        this.scrollTop -= scrollTop;
        this.hide = true;
      } else {
        this.hide = false;
      }
      if(this.newHeaderHeight > this.headerHeight){
        this.newHeaderHeight = this.headerHeight;
      }
    } else {
      this.hide = false;
      this.newHeaderHeight = this.headerHeight;
    }
    this.initHeigth(this.newHeaderHeight);
  }

  doSearch() {
    this.calculateHeigth();
    this.initHeigth(this.headerHeight);
    this.searchChangeEmitter.next(this.search);
    this.searchEmitter.next();
  }

  doClose() {
    this.configService.closePage(this.navCtrl);
  }

  doParam(event) {
    this.navCtrl.push('ParamsPage', { paimentId: 0 });
  }

  doShare() {
    this.facebookService.share();
  }

}
