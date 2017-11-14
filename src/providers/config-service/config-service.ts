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

  API_URL_CORDOVA: string = 'http://81.254.221.243:8080/';
  API_URL_LOCAL: string = 'http://localhost:8090/';
  API_URL_PROD: string = 'https://vagabond.synology.me:8443/';

}
