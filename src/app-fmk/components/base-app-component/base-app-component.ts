import {ViewChild} from '@angular/core';
import {Config, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
import {GoogleAnalyticsServiceProvider} from "../../providers/google-analytics-service/google-analytics-service";
import {LogServiceProvider} from "../../providers/log-service/log-service";
import {DataFmkServiceProvider} from "../../providers/data-fmk-service/data-fmk-service";

export abstract class BaseAppComponent {

  LANGUAGE_DEFAULT = "en";

  @ViewChild('nav') nav: Nav;

  rootPage:any = "TabsPage";

  constructor(protected translate: TranslateService, protected config: Config, protected platform: Platform, protected statusBar: StatusBar, protected splashScreen: SplashScreen,
              protected googleAnalyticsService: GoogleAnalyticsServiceProvider, protected loggerService: LogServiceProvider, protected dataService: DataFmkServiceProvider, private debug: boolean = false) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.styleLightContent();
      this.googleAnalyticsService.debug = this.debug;
      this.googleAnalyticsService.start();
    });
    this.initTranslate();
    if (location.href.indexOf("localhost") == -1) {
      this.loggerService.disableLogger();
    }
  }

  initTranslate() {
    let languagedefault = this.LANGUAGE_DEFAULT;
    this.translate.setDefaultLang(languagedefault);
    this.translate.addLangs(['fr', 'en']);
    this.translate.reloadLang('fr');
    this.translate.reloadLang('en');
    if (!this.dataService.data.language) {
      if (this.translate.getBrowserLang() !== undefined) {
        languagedefault = this.translate.getBrowserLang();
      }
      this.translate.use(languagedefault);
      this.dataService.data.language = languagedefault;
    } else {
      this.translate.use(this.dataService.data.language);
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

}
