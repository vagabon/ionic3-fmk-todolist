import {Injectable} from '@angular/core';
import {BaseServiceProvider} from "../base-service";

/**
 Service générique des Data de l'application.
 */
@Injectable()
export class DataFmkServiceProvider {

  KEY:string = 'data_vagabond_ionic2_fmk';

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
    facebookMail: ''
  }

  data = JSON.parse(JSON.stringify(this.dataInit))

  constructor(protected baseService:BaseServiceProvider) {
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

  save() {
    let storage = JSON.stringify(this.data);
    localStorage.setItem(this.KEY, storage);

    let dataSave = {};
    for (let i in this.data) {
      if (i != 'cache') {
        if (this.data[i] && this.data[i].constructor === {}.constructor) {
          dataSave[i] = JSON.stringify(this.data[i]);
        } else if (this.data[i] && this.data[i].constructor === [].constructor) {
          dataSave[i] = '';
          for (let j in this.data[i]) {
            let dimension = '';
            if (Array.isArray(this.data[i][j])) {
              let dimension2 = '';
              for (let k in this.data[i][j]) {
                if (this.data[i][j][k]) {
                  dimension2 += k + '>' + this.data[i][j][k] + ':';
                }
              }
              if (dimension2 != '') {
                dimension += j + '=' + (dimension2.length > 1 ? dimension2.substring(0, dimension2.length-1) : dimension2) + ';';
              }
            } else {
              if (this.data[i][j]) {
                dimension += j + '=' + this.data[i][j] + ';';
              }
            }
            dataSave[i] += dimension;
          }
          dataSave[i] = (dataSave[i].length > 1 ? dataSave[i].substring(0, dataSave[i].length-1) : dataSave[i]);
        } else {
          dataSave[i] = this.data[i];
        }
      }
    }
    console.log('SAVE DATA', dataSave);
    this.baseService.httpService.httpPost(this.baseService.URL + 'user/update', dataSave).subscribe(()=> {
    }, (error) => {
      if (error.exception == "No entity found for query") {
        this.data.id = 0;
        this.newUser();
      }
    });
  }

  load() {
    let storage = JSON.parse(localStorage.getItem(this.KEY));
    if (storage) {
      for (let key in this.data) {
        if (!storage.hasOwnProperty(key)) {
          storage[key] = this.data[key];
        }
      }
      this.data = storage;
      console.log('LOAD STORAGE', this.data);
    }
    this.newUser();
  }

  newUser = function () {
    if (!this.data.id || this.data.id <= 0 || this.data.id == 0 || this.data.id == '0') {
      this.baseService.httpGet(this.baseService.URL + 'user/newOne').subscribe((data) => {
        this.data.id = data.content.id;
        this.data.name = data.content.name;
        this.save();
      }, (error) => { console.error("NEW USER", error); });
    }
    this.baseService.httpGet('https://api.ipify.org/?format=json').subscribe((data) => {
      this.data.adressIp = data.content.ip;
      this.save();
    });
  }

  loadFromApi(name) {
    this.baseService.httpGet(this.baseService.URL + 'user/findBy?champs=name&values=' + name).subscribe((data) => {
      let newData = {};
      if (data.content && data.content[0]) {
        for (let key in data.content[0]) {
          let value = data.content[0][key];
          if (isNaN(value) && value.includes('{')) {
            newData[key] = JSON.parse(value);
          } else if (isNaN(value) && value.includes(':')) {
            newData[key] = [];
            let split = value.split(';');
            for (let i in split) {
              let split2 = split[i].split("=");
              let indice = split2[0];
              let valueSplit = split2[1].split(":");
              newData[key][indice] = [];
              for (let j in valueSplit) {
                let valueSplit2 = valueSplit[j].split(">");
                try {
                  newData[key][indice][valueSplit2[0]] = JSON.parse(valueSplit2[1]);
                } catch (exception) {
                  newData[key][indice][valueSplit2[0]] = valueSplit2[1];
                }
              }
            }
          } else if (isNaN(value) && value.includes(';')) {
            newData[key] = [];
            let split = value.split(';');
            for (let i in split) {
              let split2 = split[i].split("=");
              let indice = split2[0];
              newData[key][indice] = JSON.parse(split2[1]);
            }
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
        console.log('DATA FROM API', newData);
        this.save();
      }
    });
  }

}

