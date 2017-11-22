import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from "../../app-fmk/components/base-page/base-page";
import {MainServiceProvider} from "../../app-fmk/components/main-service/main-service";

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage extends BasePage {

  search: string = "";

  constructor(protected navCtrl: NavController, protected navParams:NavParams, protected mainService:MainServiceProvider) {
    super(navCtrl, navParams, mainService);
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
    if (newIndex >= this.mainService.dataService.data.lists.length) {
      var k = newIndex - this.mainService.dataService.data.lists.length;
      while ((k--) + 1) {
        this.mainService.dataService.data.lists.push(undefined);
      }
    }
    this.mainService.dataService.data.lists.splice(newIndex, 0, this.mainService.dataService.data.lists.splice(oldIndex, 1)[0]);
    this.mainService.dataService.save();
  }

  doReorderItemsList(event) {
    this.changeIndexList(event.from, event.to);
  }

  doDeleteItemList(item: any, itemSelect: any) {
    this.mainService.alertService.showConfirm('Alerte', 'Supprimer : ' + item.name, () => {
      this.mainService.dataService.data.lists.splice(this.mainService.dataService.data.lists.indexOf(item), 1);
      this.mainService.dataService.save();
    });
    itemSelect.close();
  }

}
