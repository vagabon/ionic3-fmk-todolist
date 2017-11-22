import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core/src/translate.service";
import {Platform} from "ionic-angular/platform/platform";
import {GoogleAnalyticsServiceProvider} from "../../providers/google-analytics-service/google-analytics-service";
import {LogServiceProvider} from "../../providers/log-service/log-service";
import {DataFmkServiceProvider} from "../../providers/data-fmk-service/data-fmk-service";
import {Firebase} from "@ionic-native/firebase";
import {AlertServiceProvider} from "../../providers/alert-service/alert-service";

/*
  Service contenant les services principaux.
*/
@Injectable()
export class MainServiceProvider {

  constructor(public platform: Platform, public loggerService: LogServiceProvider, public alertService: AlertServiceProvider, public translate: TranslateService,
              public googleAnalyticsService: GoogleAnalyticsServiceProvider, public dataService: DataFmkServiceProvider, public firebase: Firebase) {
  }

}
