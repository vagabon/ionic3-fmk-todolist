import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {GoogleAnalyticsServiceProvider} from "../../app-fmk/providers/google-analytics-service/google-analytics-service";
import {DataFmkServiceProvider} from "../../app-fmk/providers/data-fmk-service/data-fmk-service";
import {AlertServiceProvider} from "../../app-fmk/providers/alert-service/alert-service";

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  search: string = "";

  constructor(private navCtrl:NavController, private gAService:GoogleAnalyticsServiceProvider, private dataService:DataFmkServiceProvider, private alertService:AlertServiceProvider) {
    this.gAService.sendPageView();
  }

  doCreate() {
    this.navCtrl.push('CreatePage', {type: "lists", id : 0});
  }

  doLoadList() {

  }

  doSelectItemList(item: any) {

  }

  doModifyItemList(item: any, itemSelect: any) {
    this.navCtrl.push('CreatePage', {type: "lists", id : item.id});
    itemSelect.close();
  }


  changeIndexList(oldIndex, newIndex) {
    if (newIndex >= this.dataService.data.lists.length) {
      var k = newIndex - this.dataService.data.lists.length;
      while ((k--) + 1) {
        this.dataService.data.lists.push(undefined);
      }
    }
    this.dataService.data.lists.splice(newIndex, 0, this.dataService.data.lists.splice(oldIndex, 1)[0]);
    this.dataService.save();
  }

  doReorderItemsList(event) {
    this.changeIndexList(event.from, event.to);
  }

  doDeleteItemList(item: any, itemSelect: any) {
    this.alertService.showConfirm('Alerte', 'Supprimer : ' + item.name, () => {
      this.dataService.data.lists.splice(this.dataService.data.lists.indexOf(item), 1);
      this.dataService.save();
    });
    itemSelect.close();
  }

}
