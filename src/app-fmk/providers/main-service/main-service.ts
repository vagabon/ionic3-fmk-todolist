import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core/src/translate.service";
import {Platform} from "ionic-angular/platform/platform";
import {GoogleAnalyticsServiceProvider} from "../google-analytics-service/google-analytics-service";
import {LogServiceProvider} from "../log-service/log-service";
import {DataFmkServiceProvider} from "../data-fmk-service/data-fmk-service";
import {Firebase} from "@ionic-native/firebase";
import {AlertServiceProvider} from "../alert-service/alert-service";

/*
  Service contenant les services principaux.
*/
@Injectable()
export class MainServiceProvider {

  constructor(public platform: Platform, public loggerService: LogServiceProvider, public alertService: AlertServiceProvider, public translate: TranslateService,
              public googleAnalyticsService: GoogleAnalyticsServiceProvider, public dataService: DataFmkServiceProvider, public firebase: Firebase) {
  }

}
