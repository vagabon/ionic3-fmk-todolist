import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";
import {BaseServiceProvider} from "../base-service";
import {DataFmkServiceProvider} from "../data-fmk-service/data-fmk-service";
import {Observable} from "rxjs/Observable";

/*
  Service pour le paiment Paypall.
*/
@Injectable()
export class PaypalServiceProvider {

  constructor(protected baseService:BaseServiceProvider, protected dataService: DataFmkServiceProvider, private payPal: PayPal) {
  }

  getPaypalPaimentFromCordova() {
    return Observable.create(observer => {
      this.payPal.init({
        PayPalEnvironmentProduction: 'ATyJ-xye8oqzE_OiLrXVgzmATjlao4tXqwpga-imxq2KIHIiCmKk12dxkUI7JyYJXP2omZ7OmaxWA_sS',
        PayPalEnvironmentSandbox: 'AZ532JVCQApMc5-e3cmFNXUP_ZcCeGntywOkCg5LzrN8IH5-tNo3c-tJB403ZShm1yxzsuMQS4QLpQ55'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(() => {
          let payment = new PayPalPayment('5', 'EUR', 'Donnation CinéTchiCha', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((response) => {
            console.log("renderSinglePaymentUI Paypal", response);
            //   "client": { "environment": "sandbox", "product_name": "PayPal iOS SDK", "paypal_sdk_version": "2.16.0", "platform": "iOS" },
            //   "response_type": "payment",
            //   "response": { "id": "PAY-1AB23456CD789012EF34GHIJ", "state": "approved", "create_time": "2016-10-03T13:33:33Z", "intent": "sale" }
            let paypalPaiment = {
              amt: '5',
              cc: 'EUR',
              itemName: 'Donation Android CinéTchiCha',
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
      this.baseService.httpGet(this.baseService.URL + 'paypal/findBy?champs=id&values=' + paypalId).subscribe((data) => {
        this.dataService.load();
        if (data.content && data.content.length > 0) {
          let paypalPaiment = data.content[0];
          if (!paypalPaiment.userUsed) {
            paypalPaiment.userUsed = true;
            paypalPaiment.userId = this.dataService.data.id;
            console.log('consommation paypal paiment', paypalPaiment);
            this.baseService.httpService.httpPost(this.baseService.URL + 'paypal/update', paypalPaiment).subscribe();
            observer.next(paypalPaiment);
          } else {
            console.log('paypal paiment déjà consommé', data);
          }
        }
      }, (error) => {
        console.error('Paypal Paiement not found : ', paypalId)
      });
    });
  }

}
