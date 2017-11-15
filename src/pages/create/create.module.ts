import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePage } from './create';
import {TranslateModule} from "@ngx-translate/core";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    CreatePage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(CreatePage),
    TranslateModule.forChild()
  ],
})
export class CreatePageModule {}
