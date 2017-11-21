import {Injectable} from '@angular/core';
import {BaseServiceProvider} from "../base-service";
import {ConfigFmkServiceProvider} from "../config-fmk-service/config-fmk-service";
import {BaseDataService} from "./base-data-service";

/**
 Service générique des Data de l'application.
 */
@Injectable()
export class DataFmkServiceProvider extends BaseDataService {

  constructor(public baseService:BaseServiceProvider, protected configService: ConfigFmkServiceProvider) {
    super(baseService, configService, 'data_vagabond_ionic2_fmk', {});
  }

}

