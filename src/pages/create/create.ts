import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataFmkServiceProvider} from "../../app-fmk/providers/data-fmk-service/data-fmk-service";

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment: 'create/:type/:id'})
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  type: string;
  find: any;
  item: any = {
    id: 0,
    name: "",
    date: "",
    color: "",
    children: []
  }

  colors: Array<Array<String>> = [
    ["Bleu", "#0039b5"],
    ["Vert", "#00b51e"],
    ["Violet", "#b200b5"],
    ["Jaune", "#c1c100"],
    ["Marron", "#ea8c00"],
    ["Rouge", "#b50000"],
    ["Noir", "#000000"],
  ]

  constructor(private navCtrl: NavController, private navParams:NavParams, private dataService: DataFmkServiceProvider) {
    this.type = this.navParams.get("type");
    let id = this.navParams.get("id");
    if (id > 0) {
      this.find = this.dataService.data.lists.find((item) => item.id = id);
      if (this.find) {
        this.item = this.find;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  doSave() {
    if (!this.find) {
      let maxId = 0;
      for (let i in this.dataService.data.lists) {
        if (this.dataService.data.lists[i].id > maxId) {
          maxId = this.dataService.data.lists[i].id;
        }
      }
      this.item.id = maxId + 1;
      this.dataService.data.lists.push(this.item);
    }
    this.dataService.save();
    if (this.navCtrl.length() > 1) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot('ListsPage');
    }
  }

}
