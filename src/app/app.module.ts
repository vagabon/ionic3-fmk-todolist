import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FacebookModule} from "ngx-facebook";
import {ConfigServiceProvider} from '../providers/config-service/config-service';
import {ConfigFmkServiceProvider} from "../app-fmk/providers/config-fmk-service/config-fmk-service";
import {VagabondIonic2FmkModule} from "../app-fmk/vagabond-ionic-fmk.module";
import {DataFmkServiceProvider} from "../app-fmk/providers/data-fmk-service/data-fmk-service";
import {MyApp} from './app.component';
import { DataServiceProvider } from '../providers/data-service/data-service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getLocationStategy() {
  try {
    if (document.location.href.indexOf('https://') != -1) {
      return "path";
    } else {
      return "hash"
    }
  } catch (exception) {
    return "hash";
  }
}


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {locationStrategy: getLocationStategy}),
    FacebookModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    VagabondIonic2FmkModule.forRoot({
      config: {
        provide: ConfigFmkServiceProvider,
        useClass: (ConfigServiceProvider)
      },
      dataProvider: {
        provide: DataFmkServiceProvider,
        useClass: (DataServiceProvider)
      }
    }).providers
  ]
})
export class AppModule {
}
