import {NgModule} from '@angular/core';
import {ExpandableHeaderDirective} from "./directives/expandable-header/expandable-header";
import {ShowMoreDirective} from "./directives/show-more/show-more";
import {ContentScrollDirective} from "./directives/content-scroll/content-scroll";
import {ExpendableImageDirective} from "./directives/expendable-image/expendable-image";
import {IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {ConfigFmkServiceProvider} from "./providers/config-fmk-service/config-fmk-service";
import {FacebookServiceProvider} from "./providers/facebook-service/facebook-service";
import {HttpServiceProvider} from "./providers/http-service/http-service";
import {AlertServiceProvider} from "./providers/alert-service/alert-service";
import {DataFmkServiceProvider} from "./providers/data-fmk-service/data-fmk-service";
import {GoogleAnalyticsServiceProvider} from "./providers/google-analytics-service/google-analytics-service";
import {AdMobServiceProvider} from "./providers/ad-mob-service/ad-mob-service";
import {PaypalServiceProvider} from "./providers/paypal-service/paypal-service";
import {PayPal} from "@ionic-native/paypal";
import {AdMobFree} from "@ionic-native/admob-free";
import {Facebook} from "@ionic-native/facebook";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {Geolocation} from '@ionic-native/geolocation';
import {LogServiceProvider} from "./providers/log-service/log-service";
import {BaseServiceProvider} from "./providers/base-service";

@NgModule({
	declarations: [
    ShowMoreDirective,
    ExpandableHeaderDirective,
    ContentScrollDirective,
    ExpendableImageDirective,
  ],
	imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
	exports: [
    ShowMoreDirective,
    ExpandableHeaderDirective,
    ContentScrollDirective,
    ExpendableImageDirective,
  ]
})
export class VagabondIonic2FmkModule {

  static forRoot(config) {
    return {
      ngModule: VagabondIonic2FmkModule,
      providers: [
        config.config || ConfigFmkServiceProvider,
        config.dataProvider || DataFmkServiceProvider,
        HttpServiceProvider,
        BaseServiceProvider,
        LogServiceProvider,
        AlertServiceProvider,
        FacebookServiceProvider,
        GoogleAnalyticsServiceProvider,
        GoogleAnalytics,
        Geolocation,
        FacebookServiceProvider,
        Facebook,
        AdMobServiceProvider,
        AdMobFree,
        PaypalServiceProvider,
        PayPal
      ]
    }
  }

}
