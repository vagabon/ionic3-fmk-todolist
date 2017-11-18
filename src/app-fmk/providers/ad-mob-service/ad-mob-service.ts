import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {ConfigFmkServiceProvider} from "../config-fmk-service/config-fmk-service";

/**
 Service de gestion de Pub AbMob.
 */
@Injectable()
export class AdMobServiceProvider {

  constructor(public platform: Platform, private admobFree: AdMobFree, private configService: ConfigFmkServiceProvider) {
  }

  showBannierePub() {
    if (this.platform.is("cordova")) {
      this.platform.ready().then(() => {
        const bannerConfig: AdMobFreeBannerConfig = {
          id: this.configService.API_ADMOB_BANNIER,
          isTesting: false,
          autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare()
          .then(() => {
            this.admobFree.banner.show();
          })
          .catch(error => {
            console.error(error);
          });
      });

      window.addEventListener("orientationchange", (e) => {

        var currentOrientation = "";

        if (window.orientation == 0) {
          currentOrientation = "portrait";
        } else if (window.orientation == 90) {
          currentOrientation = "landscape";
        } else if (window.orientation == -90) {
          currentOrientation = "landscape";
        } else if (window.orientation == 180) {
          currentOrientation = "portrait";
        }
        if (currentOrientation == "portrait") {
          this.admobFree.banner.show();
        } else {
          this.admobFree.banner.hide();
        }
      }, true);
    }
  }

  toogleBannierePub(show = true) {
    if (this.platform.is("cordova")) {
      if (show) {
        this.admobFree.banner.show();
      } else {
        this.admobFree.banner.hide();
      }
    }
  }

}
