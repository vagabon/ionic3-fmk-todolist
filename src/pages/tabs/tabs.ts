import {Component, Renderer2} from "@angular/core";
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseTabsPage} from "../../app-fmk/components/base-tabs/base-tabs";
import {AdMobServiceProvider} from "../../app-fmk/providers/ad-mob-service/ad-mob-service";
import {MainServiceProvider} from "../../app-fmk/providers/main-service/main-service";

@IonicPage({ segment: 'tab', priority: 'high' })
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends BaseTabsPage {

  TABS: Array<any> = [
    { title: 'TAB_MEMOS', icon: 'md-document-outline', page: 'ListsPage' },
    { title: 'TAB_LISTS', icon: 'md-list', page: 'ListsPage' },
    { title: 'TAB_STATS', icon: 'md-stats', page: 'ListsPage' }
  ];

  constructor(protected navCtrl: NavController, protected navParams:NavParams, protected renderer: Renderer2, protected mainService:MainServiceProvider,
              protected adMobService:AdMobServiceProvider) {
    super(navCtrl, navParams, renderer, mainService, adMobService, true);
  }

}
