import {Injectable} from '@angular/core';
import {BaseServiceProvider} from "../base-service";
import {ConfigFmkServiceProvider} from "../config-fmk-service/config-fmk-service";

/**
 Service générique des Data de l'application.
 */
@Injectable()
export class DataFmkServiceProvider {

  KEY: string = 'data_vagabond_ionic2_fmk';

  dataInit = {
    id: 0,
    name: '',
    tutorial: false,
    adressIp: '',
    facebookUserId: 0,
    facebookAccessToken: '',
    facebookExpiresIn: '',
    facebookSignedRequest: '',
    facebookName: '',
    facebookPicture: '',
    facebookMail: '',
    isAdmin: true
  };

  dataApp = {
  };

  data = JSON.parse(JSON.stringify(this.dataInit));

  constructor(public baseService:BaseServiceProvider, protected configService: ConfigFmkServiceProvider) {
    if (typeof localStorage === 'object') {
      try {
        localStorage.setItem('localStorage', "1");
        localStorage.removeItem('localStorage');
      } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
        //alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
      }
    }
  }

  load(reset = false) {
    if (!reset) {
      let storage = JSON.parse(localStorage.getItem(this.KEY));
      if (storage) {
        for (let key in this.data) {
          if (!storage.hasOwnProperty(key)) {
            storage[key] = this.data[key];
          }
        }
        this.data = storage;
        this.baseService.addDataToJson(this.data, this.dataApp);
        console.log('LOAD STORAGE', this.data);
      }
    } else {
      this.data = {...this.dataInit};
      this.baseService.addDataToJson(this.data, this.dataApp);
      console.log('reset', this.data);
    }
    this.newUser();
  }

  save() {
    return new Promise((resolve, reject) => {
      let storage = JSON.stringify(this.data);
      localStorage.setItem(this.KEY, storage);
      let dataSave = {};
      for (let i in this.data) {
        dataSave[i] = JSON.stringify(this.data[i]);
        if (this.data[i] && (this.data[i].constructor === {}.constructor || this.data[i].constructor === [].constructor)) {
        } else {
          dataSave[i] = this.data[i];
        }
      }
      console.log('SAVE DATA', dataSave);
      this.baseService.httpService.httpPost(this.baseService.URL + this.configService.PATH_USER + '/update', dataSave).subscribe((data) => {
        resolve(data);
      }, (error) => {
        if (error.exception == "No entity found for query") {
          this.data.id = 0;
          this.newUser();
        }
      });
    });
  }

  newUser = function () {
    if (!this.data.id || this.data.id <= 0) {
      this.baseService.httpGet(this.baseService.URL + this.configService.PATH_USER + '/newOne', true, false).subscribe((data) => {
        this.data.id = data.content.id;
        this.data.name = data.content.name;
        this.saveAdressIp();
      }, (error) => { console.error("NEW USER", error); });
    } else {
      this.saveAdressIp();
    }
  }

  saveAdressIp() {
    this.baseService.httpGet('https://api.ipify.org/?format=json', true, false).subscribe((data) => {
      this.data.adressIp = data.content.ip;
      this.save();
    }, () => { this.save(); });
  }

  loadFromApiId(id) {
    this.baseService.httpGet(this.baseService.URL + this.configService.PATH_USER + '/findBy?champs=id&values=' + id, true, false).subscribe((data) => {
      this.transformLoadFromApiData(data.content && data.content[0] ? data.content[0] : null);
    });
  }

  loadFromApiName(name) {
    this.baseService.httpGet(this.baseService.URL + this.configService.PATH_USER + '/findBy?champs=name&values=' + name, true, false).subscribe((data) => {
      this.transformLoadFromApiData(data.content && data.content[0] ? data.content[0] : null);
    });
  }

  transformLoadFromApiData(data) {
    let newData = {};
    if (data) {
      for (let key in data) {
        let value = data[key];
        if (isNaN(value) && (value.includes('{') || value.includes('['))) {
          newData[key] = JSON.parse(value);
        } else if (value === 'true' || value === 'false') {
          newData[key] = value === 'true';
        } else if (value && typeof(value) !== "boolean" && value != '' && !Number.isNaN(parseInt(value))) {
          newData[key] = parseInt(value);
        } else {
          newData[key] = value;
        }
      }
      for (let key in newData) {
        this.data[key] = newData[key];
      }
    }
    console.log('DATA FROM API', newData);
  }

}

