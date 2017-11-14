import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {GoogleAnalyticsServiceProvider} from "../../app-fmk/providers/google-analytics-service/google-analytics-service";

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  search: string = "";
  lists = [];

  constructor(private gAService:GoogleAnalyticsServiceProvider) {
    this.gAService.sendPageView("ListsPage");
  }

  loadListes() {

  }

}
