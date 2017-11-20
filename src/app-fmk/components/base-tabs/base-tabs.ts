import {Renderer2, ViewChild} from "@angular/core";
import {NavController, Platform, Tabs} from "ionic-angular";
import {GoogleAnalyticsServiceProvider} from "../../providers/google-analytics-service/google-analytics-service";
import {DataFmkServiceProvider} from "../../providers/data-fmk-service/data-fmk-service";
import {AdMobServiceProvider} from "../../providers/ad-mob-service/ad-mob-service";

export abstract class BaseTabsPage {

  TABS: Array<any> = [];

  loadForfirstTime: boolean = true;
  selected: number  = 1;

  @ViewChild('mainTabs') mainTabs: Tabs;

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  constructor(protected platform: Platform, protected renderer: Renderer2, protected navCtrl: NavController, protected dataService:DataFmkServiceProvider,
              protected gAService:GoogleAnalyticsServiceProvider, protected adMobService:AdMobServiceProvider, protected isSubscribe: boolean) {
    if (this.dataService.data.tutorial === false) {
      this.navCtrl.setRoot("TutorialPage");
    }
    this.gAService.sendPageView("TabsPage");
    this.adMobService.showBannierePub(this.isSubscribe);
  }

  doOpenParams() {
    this.navCtrl.push("ParamsPage");
  }

  slide(e) {
    if (!this.platform.is( 'android') && !this.platform.is( 'ios')) {
      this.doSwipe(e, e.direction == '4');
    }
  }

  swipe(e, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 && Math.abs(direction[1]) < Math.abs(direction[0]) && Math.abs(direction[0]) > 30) {
        if (this.doSwipe(e, direction[0] >= 0)) {
        }
      }
    }
  }

  private doSwipe(event, isRigth) {
    let element = event.target;
    let canSlide = true;
    while (element.parentElement) {
      if (element.id == "map" || element.classList.contains("slides")) {
        canSlide = false;
        break;
      }
      if (element.classList.contains("ion-page")) {
        break;
      }
      element = element.parentElement;
    }
    if (canSlide) {
      let add = !isRigth ? 1 : -1;
      let selected = this.selected + add;
      if (selected < 0) {
        selected = this.TABS.length - 1;
      } else if (selected > this.TABS.length - 1) {
        selected = 0;
      }
      this.mainTabs.select(selected);
      return true;
    }
    return false;
  }

  selectTab() {
    for (let i = 0; i < this.TABS.length; i++) {
      this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'forceBlock');
      this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideRight');
      this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideLeft');
      this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideLeftHide');
      this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideRightHide');
    }
    if (this.selected != this.mainTabs.getSelected().index && !this.loadForfirstTime) {
      let isRigth= this.selected - this.mainTabs.getSelected().index >= 0;
      this.renderer.addClass(this.mainTabs.getByIndex(this.selected)._elementRef.nativeElement, 'forceBlock');
      this.renderer.addClass(this.mainTabs.getByIndex(this.selected)._elementRef.nativeElement, isRigth ? 'slideLeftHide' : 'slideRightHide');
      this.selected = this.mainTabs.getSelected().index;
      this.renderer.addClass(this.mainTabs.getSelected()._elementRef.nativeElement, isRigth ? 'slideRight' : 'slideLeft');
    } else {
      this.selected = this.mainTabs.getSelected().index;
      this.loadForfirstTime = false;
    }
    setTimeout(() => {
      for (let i = 0; i < this.TABS.length; i++) {
        this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'forceBlock');
        this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideRight');
        this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideLeft');
        this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideLeftHide');
        this.renderer.removeClass(this.mainTabs.getByIndex(i)._elementRef.nativeElement, 'slideRightHide');
      }
    }, 500);
  }

}
