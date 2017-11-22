import {Injectable} from '@angular/core';
import {HttpServiceProvider} from "./http-service/http-service";
import {Observable} from "rxjs/Observable";
import {Platform} from "ionic-angular";
import {ConfigFmkServiceProvider} from "./config-fmk-service/config-fmk-service";

/**
 * Base Service : GET.
 */
@Injectable()
export class BaseServiceProvider {

  URL:string = "";

  loading: boolean = false;

  constructor(public platform:Platform, public httpService: HttpServiceProvider, public configService:ConfigFmkServiceProvider) {
    if (this.platform.is("cordova")) {
      this.URL = this.configService.API_URL_CORDOVA;
    } else if (location.href.indexOf("localhost") != -1) {
      this.URL = this.configService.API_URL_LOCAL;
    } else {
      this.URL = this.configService.API_URL_PROD;
    }
  }

  httpGet(url: string, doLoading: boolean = true, doCache: boolean = true) {
    return Observable.create(observer => {
      if (doLoading) {
        this.loading = true;
      }
      this.httpService.httpGet(url, doCache).subscribe((data) => {
        if (doLoading) {
          this.loading = false;
        }
        observer.next(data);
      }, error => {
        if (doLoading) {
          this.loading = false
        }
        observer.error(error);
      });
    });
  }

  httpPost(url, json) {
    return this.httpService.httpPost(url, json);
  }

  postToAppLog(userId, userName, categorie, action, date) {
    let appLog = {
      app: this.configService.TITLE,
      userId: userId,
      userName: userName,
      categorie: categorie,
      action: action,
      date: date
    }
    this.httpPost(this.URL + "applog/update", appLog).subscribe();
  }

  addDataToEntityCode(entities, data) {
    let find = entities.find(item => item.code == data.code);
    for (let j in data) {
      if (find) {
        find[j] = data[j];
      }
    }
  }

  copyTable(table: Array<any>, data: any) {
    for (let i in data) {
      let find = table.find(item => item.code == data[i].code);
      if (find) {
        table[i] = data[i];
      } else {
        table.push(data[i]);
      }
    }
  }

  addDataToJson(table: any, data: any) {
    for (let i in data) {
      if (!table[i]) {
        table[i] = JSON.parse(JSON.stringify(data[i]));
      }
    }
  }

}
