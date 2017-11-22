import {Injectable} from '@angular/core';
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {Platform} from "ionic-angular";
import {ConfigFmkServiceProvider} from "../config-fmk-service/config-fmk-service";
import {AlertServiceProvider} from "../alert-service/alert-service";
import {BaseServiceProvider} from "../base-service";
import {DataFmkServiceProvider} from "../data-fmk-service/data-fmk-service";

declare let ga: any;

/*
  Service pour la gestion de GoogleAnalytics.
*/
@Injectable()
export class GoogleAnalyticsServiceProvider {

  initGoogleAnalytics: boolean = false;

  constructor(public platform: Platform, private configService:ConfigFmkServiceProvider, private googleAnalytics: GoogleAnalytics, private alertService: AlertServiceProvider,
              private baseService:BaseServiceProvider, private dataService:DataFmkServiceProvider) {
  }

  start(page: string = '/', event: string = 'launchMobile', action: string = this.configService.TITLE + "_" + this.configService.VERSION) {
    if (this.platform.is('cordova')) {
      this.baseService.postToAppLog(this.dataService.data.id, this.dataService.data.name, 'pageviewMobile', location.hash, new Date());
      if (this.initGoogleAnalytics === false) {
        this.googleAnalytics.startTrackerWithId(this.configService.API_GOOGLE_ANALYTICS).then(() => {
          console.log('Google analytics is ready now');
          this.initGoogleAnalytics = true;
          if (this.configService.API_GOOGLE_ANALYTICS_DEBUG === true) {
            this.alertService.presentToast('Google analytics is ready now');
          }
          this.googleAnalytics.debugMode();
          this.googleAnalytics.setAllowIDFACollection(true);
          this.googleAnalytics.trackEvent(event, action);
          this.googleAnalytics.trackView(page);
        }).catch(error => {
          console.error('Error starting GoogleAnalytics', error);
          if (this.configService.API_GOOGLE_ANALYTICS_DEBUG === true) {
            this.alertService.presentToast('Error starting GoogleAnalytics : ' + JSON.stringify(error));
          }
        });
      } else {
        this.googleAnalytics.trackEvent(event, action);
        this.googleAnalytics.trackView(page);
      }
    }
  }

  /**
   * Sends the page view to GA.
   * @param  {string} page The path portion of a URL. This value should start with a slash (/) character.
   */
  sendPageView() {
    if (this.platform.is('cordova')) {
      this.start(location.hash, 'pageviewMobile', location.hash);
    } else {
      if (location.href.indexOf('localhost') != -1) {
        let page2 = location.href;
        let split = page2.split("/");
        let newPage = "";
        for (let i=3; i < split.length; i++) {
          newPage += "/" + split[i];
        }
        ga('send', 'event', 'pageview', newPage);
        ga('set', 'page', newPage);
        ga('send', 'pageview');
        this.baseService.postToAppLog(this.dataService.data.id, this.dataService.data.name, 'pageviewSite', newPage, new Date());
      }
    }
  }

}
