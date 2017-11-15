import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ParamsPage} from './params';
import {DirectivesModule} from "../../directives/directives.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ParamsPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ParamsPage),
    TranslateModule.forChild()
  ],
})
export class ParamsPageModule {
}
