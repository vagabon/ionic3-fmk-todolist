import {Injectable} from '@angular/core';
import {DataFmkServiceProvider} from "../../app-fmk/providers/data-fmk-service/data-fmk-service";
import {BaseServiceProvider} from "../../app-fmk/providers/base-service";
import {ConfigFmkServiceProvider} from "../../app-fmk/providers/config-fmk-service/config-fmk-service";

/**
  Service des Data de l'application.
*/
@Injectable()
export class DataServiceProvider extends DataFmkServiceProvider {

  KEY:string = 'data_mysimplelist';

  dataApp = {
    lists: []
  }

  constructor(public baseService:BaseServiceProvider, protected configService: ConfigFmkServiceProvider) {
    super(baseService, configService);
  }

}
