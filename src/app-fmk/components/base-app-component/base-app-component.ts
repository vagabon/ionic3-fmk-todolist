import {ViewChild} from '@angular/core';
import {Config, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MainServiceProvider} from "../../providers/main-service/main-service";

export abstract class BaseAppComponent {

  LANGUAGE_DEFAULT = "en";

  @ViewChild('nav') nav: Nav;

  rootPage: any = "TabsPage";

  constructor(protected config: Config, protected statusBar: StatusBar, protected splashScreen: SplashScreen, protected mainService: MainServiceProvider) {
    this.mainService.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.styleLightContent();
      this.mainService.googleAnalyticsService.start();
      if (this.mainService.platform.is('cordova')) {
        this.mainService.platform.is('android') ? this.initializeFireBaseAndroid() : this.initializeFireBaseIos();
      }
    });
    this.initTranslate();
    if (location.href.indexOf("localhost") == -1) {
      this.mainService.loggerService.disableLogger();
    }
  }

  initTranslate() {
    let languagedefault = this.LANGUAGE_DEFAULT;
    this.mainService.translate.setDefaultLang(languagedefault);
    this.mainService.translate.addLangs(['fr', 'en']);
    this.mainService.translate.reloadLang('fr');
    this.mainService.translate.reloadLang('en');
    if (!this.mainService.dataService.data.language) {
      if (this.mainService.translate.getBrowserLang() !== undefined) {
        languagedefault = this.mainService.translate.getBrowserLang();
      }
      this.mainService.translate.use(languagedefault);
      this.mainService.dataService.data.language = languagedefault;
    } else {
      this.mainService.translate.use(this.mainService.dataService.data.language);
    }

    this.mainService.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  private initializeFireBaseAndroid(): Promise<any> {
    return this.mainService.firebase.getToken()
      .catch(error => console.error('Error getting token', error))
      .then(token => {
        console.log(`The token is ${token}`);
        Promise.all([
          this.mainService.firebase.subscribe('firebase-app'),
          this.mainService.firebase.subscribe('android'),
          this.mainService.firebase.subscribe(this.mainService.dataService.data.id)
        ]).then(() => {
          this.subscribeToPushNotificationEvents();
        });
      });
  }

  private initializeFireBaseIos(): Promise<any> {
    return this.mainService.firebase.grantPermission()
      .catch(error => console.error('Error getting permission', error))
      .then(() => {
        this.mainService.firebase.getToken()
          .catch(error => console.error('Error getting token', error))
          .then(token => {
            console.log(`The token is ${token}`);
            Promise.all([
              this.mainService.firebase.subscribe('firebase-app'),
              this.mainService.firebase.subscribe('ios'),
              this.mainService.firebase.subscribe(this.mainService.dataService.data.id)
            ]).then(() => {
              this.subscribeToPushNotificationEvents();
            });
          });
      })

  }

  private saveToken(token: any): Promise<any> {
    this.mainService.dataService.data.tokenAndroid = token;
    return Promise.resolve(true);
  }

  private subscribeToPushNotificationEvents(): void {

    this.mainService.firebase.onTokenRefresh().subscribe(
      token => {
        this.saveToken(token);
      },
      error => {
        console.error('Error refreshing token', error);
      });
    this.mainService.firebase.onNotificationOpen().subscribe(
      (notification) => {
        !notification.tap ? console.log('The user was using the app when the notification arrived...') : console.log('The app was closed when the notification arrived...');
        this.mainService.alertService.promptAlert(notification.title, notification.body);
      },
      error => {
        console.error('Error getting the notification', error);
      });
  }
}
