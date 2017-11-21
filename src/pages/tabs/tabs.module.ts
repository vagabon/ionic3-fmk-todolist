import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TabsPage} from "./tabs";
import {DirectivesModule} from "../../directives/directives.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild()
  ],
  exports: [
    TabsPage
  ]
})
export class TabsModule { }
