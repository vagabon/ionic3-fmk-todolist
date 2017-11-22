import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AdMobServiceProvider} from "../../app-fmk/providers/ad-mob-service/ad-mob-service";
import {BasePage} from "../../app-fmk/components/base-page/base-page";
import {MainServiceProvider} from "../../app-fmk/providers/main-service/main-service";

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
export class TutorialPage extends BasePage {

  slides: Slide[];
  showEnd: boolean = false;

  constructor(protected navCtrl: NavController, protected navParams:NavParams, protected mainService:MainServiceProvider, protected adMobService:AdMobServiceProvider) {
    super(navCtrl, navParams, mainService);
    this.adMobService.showBannierePub(false);
    // TODO : add compte desc compte facebook + synchro données + dispo Store + site Web
    this.mainService.translate.get([
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
    this.mainService.dataService.data.tutorial = true;
    this.mainService.dataService.save();
    this.navCtrl.setRoot('TabsPage', {}, {animate: true, direction: 'forward'});
  }

  onSlideChangeStart(slider) {
    this.showEnd = slider.isEnd();
  }

}
