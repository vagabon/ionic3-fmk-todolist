import {Component, ViewChild} from '@angular/core';
import {Config, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
import {GoogleAnalyticsServiceProvider} from "../app-fmk/providers/google-analytics-service/google-analytics-service";
import {LogServiceProvider} from "../app-fmk/providers/log-service/log-service";
import {DataFmkServiceProvider} from "../app-fmk/providers/data-fmk-service/data-fmk-service";
import {AdMobServiceProvider} from "../app-fmk/providers/ad-mob-service/ad-mob-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  LANGUAGE_DEFAULT = "en";

  @ViewChild('nav') nav: Nav;

  rootPage: any = 'ListsPage';

  constructor(private translate: TranslateService, private config: Config, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
              private googleAnalyticsService: GoogleAnalyticsServiceProvider, private loggerService: LogServiceProvider, public dataService: DataFmkServiceProvider, private adMobService:AdMobServiceProvider) {
    this.dataService.load();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.googleAnalyticsService.sendPageView("/");
      this.adMobService.showBannierePub();
    });
    this.initTranslate();
    if (location.href.indexOf("localhost") == -1) {
      this.loggerService.disableLogger();
    }
  }

  initTranslate() {
    this.translate.setDefaultLang(this.LANGUAGE_DEFAULT);

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use(this.LANGUAGE_DEFAULT);
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
}
