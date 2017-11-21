import {Component, Input} from '@angular/core';
import {NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {DataFmkServiceProvider} from "../../providers/data-fmk-service/data-fmk-service";
import {FacebookServiceProvider} from "../../providers/facebook-service/facebook-service";
import {GoogleAnalyticsServiceProvider} from "../../providers/google-analytics-service/google-analytics-service";
import {PaypalServiceProvider} from "../../providers/paypal-service/paypal-service";
import {AlertServiceProvider} from "../../providers/alert-service/alert-service";
import {NavController} from "ionic-angular/navigation/nav-controller";

/**
 * Directive permettant d'afficher des données suplémentaire.
 */
@Component({
  selector: 'app-params',
  template: `
    <ion-card class="label">
      <ion-item>
        <h2>{{'TITLE' | translate}}</h2>
        <ion-badge color="secondary" big item-end>UserId : {{dataService.data.id}}</ion-badge>
        <ion-badge color="secondary" big item-end>v1.0</ion-badge>
      </ion-item>
      <ion-card-content>
        <div style="display: flex" padding>
          <img src="{{image}}" style=" width: 20%; height: 20%; background: transparent;">
          <div style="width: 60%; flex: 1; padding: 0px 5px; text-align: justify;" [innerHtml]="'PARAMS_TEXT' | translate"></div>
        </div>
      </ion-card-content>
    </ion-card>

    <ion-card *ngIf="dataService.data.facebookAccessToken == ''" style="padding: 0; background: transparent; box-shadow: none; margin: 0 10px;">
      <button ion-button full (click)="facebookService.loginWithFacebook()" style="background: #4267b2;">Login Facebook</button>
    </ion-card>
    <ion-card class="label" *ngIf="dataService.data.facebookAccessToken != ''" style="margin: 0 10px;">
      <ion-item>
        <ion-avatar item-start>
          <img src="{{dataService.data.facebookPicture}}">
        </ion-avatar>
        <h2>{{'PARAMS_BIENVENUE' | translate}} <b>{{dataService.data.facebookName}}</b></h2>
        <button ion-button (click)="facebookService.logoutWithFacebook()" item-end style="margin: 0; padding: 5px; box-shadow: none;">
          <ion-icon name="close" item-start></ion-icon>
        </button>
      </ion-item>
    </ion-card>

    <ion-card style=" padding: 0; background: transparent; box-shadow: none; margin: 0 10px; ">
      <button ion-button full color="secondary" (click)="doTutorial()">Tutorial</button>
    </ion-card>

    <ion-card *ngIf="showDonation && donate === false" style="padding: 0; margin: 0 10px; background: transparent; box-shadow: none;">
      <button ion-button full (click)="doPaypalPaiementCordova()" style="background: #FFA926; margin: 0;" *ngIf="isCordova()">Donate with Paypall</button>

      <form #form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" style="width: 100%; position: relative;" *ngIf="!isCordova() && !isLocal()">
        <input type="hidden" name="cmd" value="_s-xclick">

        <input type="hidden" name="hosted_button_id" value="{{keyPaypall}}">
        <button ion-button full (click)="form.submit()" style="background: #FFA926; margin: 0;">Donate with Paypall</button>
      </form>

      <form #form2 action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top" style="width: 100%; position: relative;" *ngIf="!isCordova() && isLocal()">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="{{keyPaypallSandbox}}">
        <input type="hidden" value="https://vagabond.synology.me/apiallocine/getPaypalPaiment.php" name="return">
        <input type="hidden" value="2" name="rm">
        <button ion-button full (click)="form2.submit()" style="background: #FFA926; margin: 0;">Donate with Paypall</button>
      </form>
    </ion-card>
    <ion-card *ngIf="showDonation && donate === true" style="text-align: center; margin: 0 10px; padding: 6px 5px; background: #FFA926; color: white; font-weight: bold;">
      <h2 style="color: white">Merci pour votre donation :)</h2>
    </ion-card>

    <app-content-scroll>
      
      <ng-content></ng-content>

      <ion-item *ngIf="dataService.data.isAdmin">
        <ion-icon name="help" item-start></ion-icon>
        <ion-label>Load API</ion-label>
        <ion-input [(ngModel)]="nameLoad"></ion-input>
        <ion-toggle [(ngModel)]="load" color="secondary" (ionChange)="doLoad()"></ion-toggle>
      </ion-item>
      
      <ion-item *ngIf="dataService.data.isAdmin">
        <ion-icon name="refresh" item-start></ion-icon>
        <ion-label> {{'PARAMS_DELETE_DATA' | translate}}</ion-label>
        <ion-toggle [(ngModel)]="reset" color="secondary" (ionChange)="doReset()"></ion-toggle>
      </ion-item>

      <ion-list radio-group [(ngModel)]="language" (ionChange)="doChangeLanguage()" style="width: 100%">
        <ion-list-header>
          {{'PARAMS_LANGUAGE' | translate}}
        </ion-list-header>
        <ion-item>
          <ion-label color="dark">{{'PARAMS_FRENCH' | translate}}</ion-label>
          <ion-radio value="fr"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label color="dark">{{'PARAMS_ENGLISH' | translate}}</ion-label>
          <ion-radio value="en"></ion-radio>
        </ion-item>
      </ion-list>
      <div class="flex1"></div>
    </app-content-scroll>
  `
})
export class ParamsDirective {

  @Input() keyPaypall: string= '';
  @Input() keyPaypallSandbox: string= '';
  @Input() showDonation: boolean = true;
  @Input() image: string = 'assets/icon/logo_black.png';

  reset:boolean;
  nameLoad: string;
  load:boolean;
  language:string = "en";
  donate:boolean = false;

  constructor(private navCtrl: NavController, private platform:Platform, private navParams:NavParams, private translate: TranslateService, private dataService:DataFmkServiceProvider, public facebookService: FacebookServiceProvider,
              protected gAService:GoogleAnalyticsServiceProvider, private paypalService:PaypalServiceProvider, private alertService:AlertServiceProvider) {
    this.language = this.dataService.data.language;
    this.gAService.sendPageView("ParamsPage");

    let paimentId = this.navParams.get("paimentId");
    if (paimentId && paimentId > 0) {
      this.paypalService.getPaypalPaimentFromApi(paimentId).subscribe(() => {
        this.donate = true;
      });
    }
    this.nameLoad = this.dataService.data.name;
    this.load = false;
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
        this.dataService.load(true);
        this.reset = false;
      }, () => {
        this.reset = false;
      });
    }
  }

  doLoad() {
    if (this.load === true) {
      this.alertService.showConfirm('Load from API', 'Synchroniser vos données en ligne ?', () => {
        this.dataService.loadFromApiName(this.nameLoad);
        this.load = false;
      }, () => {
        this.load = false;
      });
    }
  }

  doChangeLanguage() {
    this.translate.use(this.language);
    this.dataService.data.language = this.language;
    this.dataService.save();
  }

  doLoginFacebook() {
    this.facebookService.loginWithFacebook();
  }
  doCloseFacebook() {
    this.facebookService.logoutWithFacebook();
  }

  doTutorial() {
    this.navCtrl.push("TutorialPage");
  }

}
