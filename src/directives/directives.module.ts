import {NgModule} from '@angular/core';
import {ShowItemDirective} from './show-item/show-item';
import {IonicModule} from "ionic-angular";
import {VagabondIonic2FmkModule} from "../app-fmk/vagabond-ionic-fmk.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShowItemDirective
  ],
  imports: [
    IonicModule,
    VagabondIonic2FmkModule,
    TranslateModule.forChild()
  ],
  exports: [
    ShowItemDirective,
    VagabondIonic2FmkModule
  ]
})
export class DirectivesModule {
}
