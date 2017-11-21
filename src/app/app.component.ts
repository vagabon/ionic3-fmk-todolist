import {Component} from '@angular/core';
import {Config, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
import {GoogleAnalyticsServiceProvider} from "../app-fmk/providers/google-analytics-service/google-analytics-service";
import {LogServiceProvider} from "../app-fmk/providers/log-service/log-service";
import {BaseAppComponent} from "../app-fmk/components/base-app-component/base-app-component";
import {DataFmkServiceProvider} from "../app-fmk/providers/data-fmk-service/data-fmk-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends BaseAppComponent {

  constructor(protected translate: TranslateService, protected config: Config, protected platform: Platform, protected statusBar: StatusBar, protected splashScreen: SplashScreen,
              protected googleAnalyticsService: GoogleAnalyticsServiceProvider, protected loggerService:LogServiceProvider, protected dataService:DataFmkServiceProvider) {
    super(translate, config, platform, statusBar, splashScreen, googleAnalyticsService, loggerService, dataService);
  }

}
