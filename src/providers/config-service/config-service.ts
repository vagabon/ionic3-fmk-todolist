import { Injectable } from '@angular/core';

/*
  Service pour la configuration des données.
*/
@Injectable()
export class ConfigServiceProvider {

  API_FACEBOOK_TEST: string = '116657432071061';
  API_FACEBOOK_PROD: string = '';

  API_ADMOB_BANNIER: string = 'ca-app-pub-6760229630893031/5081528497';

  API_GOOGLE_ANALYTICS: string = 'UA-109185979-2';

  API_PAYPAL_KEY: string = 'ATyJ-xye8oqzE_OiLrXVgzmATjlao4tXqwpga-imxq2KIHIiCmKk12dxkUI7JyYJXP2omZ7OmaxWA_sS';
  API_PAYPAL_SANDBOX_KEY: string = 'AZ532JVCQApMc5-e3cmFNXUP_ZcCeGntywOkCg5LzrN8IH5-tNo3c-tJB403ZShm1yxzsuMQS4QLpQ55';
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  API_PAYPAL_MOBILE_ENVIRONMENTS: string = 'PayPalEnvironmentNoNetwork';
  API_PAYPAL_PRICE: string = '5';
  API_PAYPAL_CURRENCY: string = 'EUR';
  API_PAYPAL_NAME: string = 'Donnation MySimpleList';

  API_URL_CORDOVA: string = 'http://81.254.221.243:8080/';
  API_URL_LOCAL: string = 'http://localhost:8090/';
  API_URL_PROD: string = 'https://vagabond.synology.me:8443/';

}
