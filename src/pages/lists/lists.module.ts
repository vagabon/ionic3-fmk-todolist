import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ListsPage} from "./lists";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    ListsPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ListsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListsPage
  ]
})
export class ListsPageModule { }
