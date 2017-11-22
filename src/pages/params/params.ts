import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PaypalServiceProvider} from "../../app-fmk/providers/paypal-service/paypal-service";
import {MainServiceProvider} from "../../app-fmk/providers/main-service/main-service";
import {BasePage} from "../../app-fmk/components/base-page/base-page";

/**
 * Modale de paramètre.
 */

@IonicPage({segment: 'params/:paimentId'})
@Component({
  selector: 'page-params',
  templateUrl: 'params.html',
})
export class ParamsPage extends BasePage {

  reset:boolean;
  language:string = "en";

  donate:boolean = false;

  constructor(protected navCtrl: NavController, protected navParams:NavParams, protected mainService:MainServiceProvider, private paypalService:PaypalServiceProvider) {
    super(navCtrl, navParams, mainService);
    if (this.mainService.translate.getBrowserLang() !== undefined) {
      this.language = this.mainService.translate.getBrowserLang();
    }

    let paimentId = this.navParams.get("paimentId");
    if (paimentId && paimentId > 0) {
      this.paypalService.getPaypalPaimentFromApi(paimentId).subscribe(() => {
        this.donate = true;
      });
    }
  }

  doPaypalPaiementCordova() {
    this.paypalService.getPaypalPaimentFromCordova().subscribe(() => {
      this.donate = true;
    });
  }

  isCordova() {
    return this.mainService.platform.is('cordova');
  }

  isLocal() {
    return location.href.indexOf("localhost") != -1;
  }

  doReset() {
    if (this.reset === true) {
      this.mainService.alertService.showConfirm('Alerte', 'Supprimer les données ?', () => {
        this.mainService.dataService.data = {...this.mainService.dataService.dataInit};
        this.mainService.dataService.baseService.addDataToJson(this.mainService.dataService.data, this.mainService.dataService.dataApp);
        this.mainService.dataService.save();
        this.reset = false;
      }, () => {
        this.reset = false;
      });
    }
  }

  doChangeLanguage() {
    this.mainService.translate.use(this.language);
  }

}
