import {Component, Renderer2} from "@angular/core";
import {IonicPage, NavController, Platform} from "ionic-angular";
import {BaseTabsPage} from "../../app-fmk/components/base-tabs/base-tabs";
import {GoogleAnalyticsServiceProvider} from "../../app-fmk/providers/google-analytics-service/google-analytics-service";
import {AdMobServiceProvider} from "../../app-fmk/providers/ad-mob-service/ad-mob-service";
import {DataFmkServiceProvider} from "../../app-fmk/providers/data-fmk-service/data-fmk-service";

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

  constructor(protected platform: Platform, protected renderer: Renderer2, protected navCtrl: NavController, protected dataService:DataFmkServiceProvider,
              protected gAService:GoogleAnalyticsServiceProvider, protected adMobService:AdMobServiceProvider) {
    super(platform, renderer, navCtrl, dataService, gAService, adMobService, true);
  }

}
