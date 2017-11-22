import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';
import {GoogleAnalyticsServiceProvider} from "../../app-fmk/providers/google-analytics-service/google-analytics-service";
import {DataFmkServiceProvider} from "../../app-fmk/providers/data-fmk-service/data-fmk-service";
import {AdMobServiceProvider} from "../../app-fmk/providers/ad-mob-service/ad-mob-service";

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  slides: Slide[];
  showEnd: boolean = false;

  constructor(public navCtrl: NavController, translate: TranslateService, private dataService: DataFmkServiceProvider, protected gAService: GoogleAnalyticsServiceProvider,
              protected adMobService:AdMobServiceProvider) {
    this.adMobService.showBannierePub(false);
    this.gAService.sendPageView();
    // TODO : add compte desc compte facebook + synchro données + dispo Store + site Web
    translate.get([
      "TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION"
    ]).subscribe(
      (values) => {
        this.slides = [{
          title: values.TUTORIAL_SLIDE1_TITLE,
          description: values.TUTORIAL_SLIDE1_DESCRIPTION,
          image: 'assets/icon/logo_black.png'
        }];
      });
  }

  ionViewDidEnter() {
  }

  doEndTutorial() {
    this.dataService.data.tutorial = true;
    this.dataService.save();
    this.navCtrl.setRoot('TabsPage', {}, {animate: true, direction: 'forward'});
  }

  onSlideChangeStart(slider) {
    this.showEnd = slider.isEnd();
  }

}
