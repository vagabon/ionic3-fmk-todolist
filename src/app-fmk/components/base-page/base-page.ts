import {NavController, NavParams} from 'ionic-angular';
import {MainServiceProvider} from "../main-service/main-service";

export abstract class BasePage {

  constructor(protected navCtrl: NavController, protected navParams:NavParams, protected mainService: MainServiceProvider) {
  }

  ionViewWillEnter() {
    this.mainService.googleAnalyticsService.sendPageView();
  }
}
