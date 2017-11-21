import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";
import {BaseServiceProvider} from "../base-service";
import {DataFmkServiceProvider} from "../data-fmk-service/data-fmk-service";
import {Observable} from "rxjs/Observable";
import {ConfigFmkServiceProvider} from "../config-fmk-service/config-fmk-service";

/*
  Service pour le paiment Paypall.
*/
@Injectable()
export class PaypalServiceProvider {

  constructor(protected baseService:BaseServiceProvider, protected dataService: DataFmkServiceProvider, private payPal: PayPal, private configService:ConfigFmkServiceProvider) {
  }

  getPaypalPaimentFromCordova(json = {
    price: this.configService.API_PAYPAL_PRICE,
    currency: this.configService.API_PAYPAL_CURRENCY,
    name: this.configService.API_PAYPAL_NAME,
  }) {
    return Observable.create(observer => {
      this.payPal.init({
        PayPalEnvironmentProduction: this.configService.API_PAYPAL_KEY,
        PayPalEnvironmentSandbox: this.configService.API_PAYPAL_SANDBOX_KEY
      }).then(() => {
        this.payPal.prepareToRender(this.configService.API_PAYPAL_MOBILE_ENVIRONMENTS, new PayPalConfiguration({})).then(() => {
          let payment = new PayPalPayment(json.price, json.currency, json.name, 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((response) => {
            console.log("renderSinglePaymentUI Paypal", response);
            let paypalPaiment = {
              amt: json.price,
              cc: json.currency,
              itemName: json.name,
              st: '' + response.response.state,
              tx: '' + response.response.id,
              userUsed: true,
              userId: this.dataService.data.id
            }
            this.baseService.httpService.httpPost(this.baseService.URL + 'paypal/update', paypalPaiment).subscribe();
            observer.next(paypalPaiment);
          }, (error) => {
            console.error("renderSinglePaymentUI", error);
          });
        }, (error) => {
          console.error("prepareToRender", error);
        });
      }, (error) => {
        console.error("init", error);
      });
    });
  }

  getPaypalPaimentFromApi(paypalId) {
    return Observable.create(observer => {
      this.baseService.httpGet(this.baseService.URL + 'paypal/findBy?champs=id&values=' + paypalId, true, false).subscribe((data) => {
        if (data.content && data.content.length > 0) {
          let paypalPaiment = data.content[0];
          if (!paypalPaiment.userUsed) {
            paypalPaiment._userUsed = paypalPaiment.userUsed === true;
            paypalPaiment.userUsed = true;
            paypalPaiment.userId = this.dataService.data.id;
            console.log('consommation paypal paiment', paypalPaiment);
            this.baseService.httpService.httpPost(this.baseService.URL + 'paypal/update', paypalPaiment).subscribe();
            observer.next(paypalPaiment);
          } else {
            console.log('paypal paiment déjà consommé', data.content && data.content.length ? data.content[0] : {});
          }
        }
      }, () => {
        console.error('Paypal Paiement not found : ', paypalId)
      });
    });
  }

}
