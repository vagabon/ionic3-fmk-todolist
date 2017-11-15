import {Injectable} from '@angular/core';
import {AlertController, ModalController, Popover, PopoverController} from "ionic-angular";

/*
*/
@Injectable()
export class AlertServiceProvider {

  popover: Popover;

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
  }

  promptAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  showConfirm(title: string, message: string, doNext) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Ok',
          handler: () => {
            doNext();
          }
        }
      ]
    });
    confirm.present();
  }

  presentPopover(page, myEvent) {
    this.popover = this.popoverCtrl.create(page);
    this.popover.present({ ev: myEvent });
  }
  openModale(page, data = {}) {
    let modal = this.modalCtrl.create(page, data);
    modal.present();
  }
}
