import {Component} from '@angular/core';
import {Config} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BaseAppComponent} from "../app-fmk/components/base-app-component/base-app-component";
import {MainServiceProvider} from "../app-fmk/providers/main-service/main-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends BaseAppComponent {

  constructor(protected config: Config,protected statusBar: StatusBar, protected splashScreen: SplashScreen, protected mainService:MainServiceProvider) {
    super(config, statusBar, splashScreen, mainService);
  }

}
