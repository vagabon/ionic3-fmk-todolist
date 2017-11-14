import {Injectable} from '@angular/core';

/*
  Service pour la gestion des logs.
*/
@Injectable()
export class LogServiceProvider {

  private oldConsoleLog = null;

  enableLogger(){
    if (this.oldConsoleLog == null) { return; }
    window['console']['log'] = this.oldConsoleLog;
  }

  disableLogger() {
    this.oldConsoleLog = console.log;
    window['console']['log'] = function () { };
  };

}
