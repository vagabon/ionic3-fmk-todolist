import {Component} from '@angular/core';
import {IonicPage, NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {DataFmkServiceProvider} from "../../app-fmk/providers/data-fmk-service/data-fmk-service";
import {FacebookServiceProvider} from "../../app-fmk/providers/facebook-service/facebook-service";
import {PaypalServiceProvider} from "../../app-fmk/providers/paypal-service/paypal-service";
import {GoogleAnalyticsServiceProvider} from "../../app-fmk/providers/google-analytics-service/google-analytics-service";
import {AlertServiceProvider} from "../../app-fmk/providers/alert-service/alert-service";

/**
 * Modale de paramètre.
 */

@IonicPage({segment: 'params/:paimentId'})
@Component({
  selector: 'page-params',
  templateUrl: 'params.html',
})
export class ParamsPage {

  reset:boolean;
  language:string = "en";

  donate:boolean = false;

  constructor(private platform:Platform, private navParams:NavParams, private translate: TranslateService, private dataService:DataFmkServiceProvider, public facebookService: FacebookServiceProvider,
              protected gAService:GoogleAnalyticsServiceProvider, private paypalService:PaypalServiceProvider, private alertService:AlertServiceProvider) {
    if (this.translate.getBrowserLang() !== undefined) {
      this.language = this.translate.getBrowserLang();
    }
    this.gAService.sendPageView("/params");

    let paimentId = this.navParams.get("paimentId");
    if (paimentId && paimentId > 0) {
      this.paypalService.getPaypalPaimentFromApi(paimentId).subscribe(() => {
        this.donate = true;
      });
    }
  }

  ionViewWillEnter() {
    this.gAService.sendPageView("/params");
  }

  doPaypalPaiementCordova() {
    this.paypalService.getPaypalPaimentFromCordova().subscribe(() => {
      this.donate = true;
    });
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  isLocal() {
    return location.href.indexOf("localhost") != -1;
  }

  doReset() {
    if (this.reset === true) {
      this.alertService.showConfirm('Alerte', 'Supprimer les données ?', () => {
        this.dataService.data = {...this.dataService.dataInit};
        this.dataService.baseService.addDataToJson(this.dataService.data, this.dataService.dataApp);
        this.dataService.save();
        this.reset = false;
      }, () => {
        this.reset = false;
      });
    }
  }

  doChangeLanguage() {
    this.translate.use(this.language);
  }

}
