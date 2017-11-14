import {Injectable} from '@angular/core';
import {NavController} from "ionic-angular";

/*
  Provider Condif du FRAMEWORK.
*/
@Injectable()
export class ConfigFmkServiceProvider {

  API_FACEBOOK_TEST: string = 'API_FACEBOOK_TEST';
  API_FACEBOOK_PROD: string = 'API_FACEBOOK_PROD';

  API_ADMOB_BANNIER: string = 'API_ADMOB_BANNIER';

  API_GOOGLE_ANALYTICS: string = 'API_GOOGLE_ANALYTICS';

  API_URL_CORDOVA: string = 'API_URL_CORDOVA';
  API_URL_LOCAL: string = 'API_URL_LOCAL';
  API_URL_PROD: string = 'API_URL_PROD';

  constructor() {
  }

  closePage(navCtrl: NavController) {
    navCtrl.popToRoot();
  }
}
