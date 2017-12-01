import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpServiceProvider {

  cache: Array<any> = [];

  constructor(public http: Http) {
  }

  httpGet(url, doCache = true) {
    return Observable.create(observer => {
      if (this.cache[url] && doCache) {
        console.log('GET CACHE', url);
        observer.next(this.cache[url]);
      } else {
        this.http.get(url)
          .map(res => {
            try {
              return res.json();
            } catch(exception) {
              console.error(url, res, exception);
              observer.error(exception);
            }
          }).subscribe((data) => {
          if (!this.isException(url, data)) {
            let dataJson = {
              url: url,
              content: data
            };
            this.cache[url] = {...dataJson};
            observer.next(dataJson);
          }
        }, error => {
          this.showError(url, error);
          observer.error(error);
        });
      }
    });
  }

  httpPost(url, json) {
    return Observable.create(observer => {
      this.http.post(url, json).map(res => res.json()).subscribe(data => {
        console.log('POST URL', url, json, data);
        if (!this.isException(url, data)) {
          observer.next(data);
        } else {
          observer.error(data);
        }
      }, error => {
        console.error('POST URL', url, json, error);
        this.showError(url, error);
        observer.error(error);
      });
    });
  }

  isException(url, data) {
    if (data['exception']) {
      this.showError(url, data['exception']);
      return true;
    } else {
      if (data['stacktrace']) {
        this.showError(url, data['stacktrace']);
        return true;
      }
    }
    return false;
  }

  showError(url, error) {
    // TODO : gestion erreur or ligne avec bandeau et non pop up ! > afficher les erreurs dans un bandeau !!
    console.error(url, error);
    /* TODO : tester si pas en prod !
    if (error != 'SyntaxError: Unexpected end of JSON input') {
      const alert = this.alertCtrl.create({
        title: 'Erreur avec l\'API',
        subTitle: url + "=" + error,
        buttons: ['Ok']
      });
      alert.present();
    }*/
  }
}
