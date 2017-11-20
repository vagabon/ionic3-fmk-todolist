import {ViewChild} from '@angular/core';
import {Config, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
import {GoogleAnalyticsServiceProvider} from "../../providers/google-analytics-service/google-analytics-service";
import {LogServiceProvider} from "../../providers/log-service/log-service";

export abstract class BaseAppComponent {

  LANGUAGE_DEFAULT = "en";

  @ViewChild('nav') nav: Nav;

  rootPage:any = "TabsPage";

  constructor(protected translate: TranslateService, protected config: Config, protected platform: Platform, protected statusBar: StatusBar, protected splashScreen: SplashScreen,
              protected googleAnalyticsService: GoogleAnalyticsServiceProvider, protected loggerService:LogServiceProvider) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.googleAnalyticsService.sendPageView("/");
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
