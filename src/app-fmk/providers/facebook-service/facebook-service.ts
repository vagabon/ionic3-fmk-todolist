import {Injectable} from '@angular/core';
import {FacebookService} from "ngx-facebook";
import {Facebook} from "@ionic-native/facebook";
import {BaseServiceProvider} from "../base-service";
import {DataFmkServiceProvider} from "../data-fmk-service/data-fmk-service";
import {ConfigFmkServiceProvider} from "../config-fmk-service/config-fmk-service";

/*
  Service pour la gestion de facebook.
*/
@Injectable()
export class FacebookServiceProvider {

  mainService: any;

  constructor(private baseService:BaseServiceProvider, private dataService:DataFmkServiceProvider, private facebookService: FacebookService, private facebookCordova:Facebook, private configService:ConfigFmkServiceProvider) {
    if (!this.baseService.platform.is('cordova')) {
      this.mainService = this.facebookService;
      this.facebookService.init({
        appId: location.href.indexOf('localhost') != -1 ? this.baseService.configService.API_FACEBOOK_TEST : this.baseService.configService.API_FACEBOOK_PROD,
        xfbml: true,
        version: 'v2.10'
      }).then(() => {
        console.log('load api facebook');
      }).catch((error) => {
        console.error('error api facebook' + error);
      });
    } else {
      this.mainService = this.facebookCordova;
    }
  }

  doNothing() {

  }


  loginWithFacebook(path = "user") {
    return new Promise((resolve, reject) => {
      (<any>this.mainService).login(["public_profile", "email"])
        .then((response) => {
          if (response.authResponse) {
            console.log("LOGIN WITH FACEBOOK", response);
            this.setFacebookResponseLogin(response);
            (<any>this.mainService).api('/me?fields=id,name,picture,email', ["public_profile", "email"]).then((responseApi) => {
              console.log("LOGIN WITH FACEBOOK DATA USER", responseApi);
              this.setFacebookResponseApi(responseApi);
              this.baseService.httpGet(this.baseService.URL + path + "/findBy?champs=facebookUserId&values=" + this.dataService.data.facebookUserId).subscribe((data) => {
                console.log("USER FACEBOOK", data, this.dataService.data);
                if (data.content && data.content.length > 0) {
                  if (this.dataService.data.id != data.content[0].id) {
                    this.baseService.httpService.httpPost(this.baseService.URL + path + "/delete?id=" + this.dataService.data.id, {}).subscribe();
                  }
                  this.dataService.data = this.dataService.transformLoadFromApiData(data.content[0]);
                  this.setFacebookResponseLogin(response);
                  this.setFacebookResponseApi(responseApi);
                }
                this.dataService.save().then(() => {
                  // TODO : verify resolve or transform on Observable
                  resolve(responseApi);
                }, (error) => {
                  reject(error);
                });
              }, (error) => {
                this.dataService.save();
                reject(error);
              });
            }).catch((error: any) => {
              console.error("error api " + error);
              reject(error);
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
            reject('User cancelled login or did not fully authorize.');
          }
        })
        .catch((error: any) => {
          console.error("error login " + JSON.stringify(error));
          reject(error);
        });
    });
  }

  setFacebookResponseLogin(response) {
    this.dataService.data.facebookUserId = response.authResponse.userID;
    this.dataService.data.facebookAccessToken = response.authResponse.accessToken;
    this.dataService.data.facebookExpiresIn = response.authResponse.expiresIn;
    this.dataService.data.facebookSignedRequest = response.authResponse.signedRequest;
  }

  setFacebookResponseApi(responseApi) {
    this.dataService.data.facebookName = responseApi.name;
    this.dataService.data.facebookPicture = responseApi.picture.data.url;
    this.dataService.data.facebookMail = responseApi.email;
  }

  logoutWithFacebook(): void {
    this.dataService.data.facebookAccessToken = this.dataService.dataInit.facebookAccessToken;
    this.dataService.data.facebookExpiresIn = this.dataService.dataInit.facebookExpiresIn;
    this.dataService.data.facebookSignedRequest = this.dataService.dataInit.facebookSignedRequest;
    this.dataService.save();
    //(<any>this.mainService).logout().catch((error) => console.error(error));
  }

  share(json = {
    title: this.configService.API_FACEBOOK_TITLE,
    url: this.configService.API_FACEBOOK_URL,
    image: this.configService.API_FACEBOOK_IMAGE,
    description: this.configService.API_FACEBOOK_DESCRIPTION,
  }) {
    if (this.baseService.platform.is('cordova')) {
      var options = {
        method: 'share_open_graph',
        action: 'share',
        action_properties: JSON.stringify({ 'expires_in': 3600 }),
        object: JSON.stringify({
          'og:type': 'share',
          'og:title': json.title,
          'og:url': json.url,
          'og:description': json.description,
          'og:image': json.image
        })
      };
      this.facebookCordova.showDialog(options);
    } else {
      this.facebookService.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            'og:url': json.url,
            'og:title': json.title,
            'og:description': json.description,
            'og:image': json.image,
          }
        })
      });
    }
  }

}
