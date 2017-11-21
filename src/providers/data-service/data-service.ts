import {Injectable} from '@angular/core';
import {BaseServiceProvider} from "../../app-fmk/providers/base-service";
import {ConfigFmkServiceProvider} from "../../app-fmk/providers/config-fmk-service/config-fmk-service";
import {BaseDataService} from "../../app-fmk/providers/data-fmk-service/base-data-service";

/**
  Service des Data de l'application.
*/
@Injectable()
export class DataServiceProvider extends BaseDataService {

  constructor(public baseService:BaseServiceProvider, protected configService: ConfigFmkServiceProvider) {
    super(baseService, configService, 'data_mysimplelist', {
      lists: []
    });
  }

}
