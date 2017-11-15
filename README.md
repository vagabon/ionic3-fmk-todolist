**Framework Ionic 3 / Angular 5**

Presentation
--------

This is a Framework to use in an project with Ionic 3 and Angular 5.
* Expandable header
* Facebook login
* Paypal donation
* Google Analytics
* AdMob

Démo : 
* MySimpleList (repo project) : https://mysimplelist.gonzague-clement.fr
* CinéTchicha (an other project) : https://cinetchicha.fr

Install
--------

Create a new Ionic 3 project
> ionic start PROJECT_NAME blank<br/>
> cordova platform add android<br/>
> cordova platform add ios


Add Pluggins :

* Translate  
  > npm install @ngx-translate/core --save
  > npm install @ngx-translate/http-loader --save
  
* Geolocation
  > ionic cordova plugin add cordova-plugin-geolocation --save
  > npm install --save @ionic-native/geolocation
  
* Statusbar
  > ionic cordova plugin add cordova-plugin-statusbar
  > npm install --save @ionic-native/status-bar
  
* Google Analytics
  > ionic cordova plugin add cordova-plugin-google-analytics
  > npm install --save @ionic-native/google-analytics  
  > npm install --save-dev @types/google.analytics  
  
* Facebook
  > ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="" --variable APP_NAME=""
  > npm install --save @ionic-native/facebook
  > npm i --save ngx-facebook
  
* AdMob
  > ionic cordova plugin add cordova-plugin-admob-free
  > npm install --save @ionic-native/admob-free
  
* Paypal
  > ionic cordova plugin add com.paypal.cordova.mobilesdk
  > npm install --save @ionic-native/paypal

Install module
  > npm install --save https://github.com/vagabon/ionic3-fmk-todolist.git
  
Change the app.modules.ts
  >  export function createTranslateLoader(http: HttpClient) {<br/>
     &nbsp;&nbsp;return new TranslateHttpLoader(http, './assets/i18n/', '.json');<br/>
     }<br/>
     &nbsp;...<br/>
     @NgModule({<br/>
     &nbsp;...<br/>
     &nbsp;imports: [<br/>
     &nbsp;&nbsp;&nbsp;...<br/>
     &nbsp;&nbsp;VagabondIonic2FmkModule,<br/>
     &nbsp;&nbsp;TranslateModule.forRoot({<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;loader: {<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provide: TranslateLoader,<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;useFactory: createTranslateLoader,<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deps: [HttpClient]<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
     &nbsp;&nbsp;&nbsp;}),<br/>
     &nbsp;&nbsp;FacebookModule.forRoot()<br/>
     &nbsp;&nbsp;...<br/>
     ],<br/>
     exports: [<br/>
     &nbsp;...<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;VagabondIonic2FmkModule<br/>
     &nbsp;...<br/>
     ]<br/>
     providers: [<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;StatusBar,<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;SplashScreen,<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;{provide: ErrorHandler, useClass: IonicErrorHandler},<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;VagabondIonic2FmkModule.forRoot({<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config: {<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provide: ConfigFmkServiceProvider,<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;useClass: (ConfigServiceProvider)<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dataProvider: {<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provide: DataFmkServiceProvider,<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;useClass: (DataServiceProvider)<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;}).providers<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;...<br/>
     ]<br/>

ionic generate provider DataService
  > @Injectable()
    export class DataServiceProvider extends DataFmkServiceProvider {<br/>
    &nbsp;&nbsp;KEY:string = 'data_<PROJECT_NAME>';<br/>
    &nbsp;&nbsp;constructor(public baseService:BaseServiceProvider) {<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;super(baseService);<br/>
    &nbsp;&nbsp;}<br/>
    }<br/>

ionic generate provider ConfigService (change const from ConfigFmkServiceProvider)
  > @Injectable()<br/>
    export class ConfigServiceProvider {

example of .html

  > <expandable-header title="{{TITLE | translate}}"><br/>
  > </expandable-header><br/><br/>
  > <ion-content><br/>
  > &nbsp;&nbsp;<app-content-scroll notFound="{{NO_ITEM_FOUND | translate}}" [loading]="loading" [list]="lists"><br/>
  > &nbsp;&nbsp;</app-content-scroll>
  > </ion-content>

example of Compenent .ts
  > @IonicPage()<br/>
  > @Component({<br/>
  > &nbsp;&nbsp;&nbsp;&nbsp;selector: 'page-lists',<br/>
  > &nbsp;&nbsp;&nbsp;&nbsp;templateUrl: 'lists.html'<br/>
  > })<br/>
  > export class ListsPage {<br/>  
  > &nbsp;&nbsp;&nbsp;&nbsp;search: string = "";<br/><br/>
  > &nbsp;&nbsp;&nbsp;&nbsp;constructor(private gAService:GoogleAnalyticsServiceProvider, private dataService:DataFmkServiceProvider, private alertService:AlertServiceProvider) {<br/>
  > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.gAService.sendPageView("ListsPage");<br/>
  > &nbsp;&nbsp;&nbsp;&nbsp;}<br/>    
  > ...<br/>
  > }<br/>
