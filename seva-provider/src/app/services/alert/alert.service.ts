/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) { }

  async show(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom' ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position
    });
    toast.present();
  }

  async showSuccessMessage(origin: string, message: string) {
    const toast = await this.toastCtrl.create({
      message: origin+': '+message,
      color : 'success',
      duration: 2000
    });
    toast.present();
  }

  async showError(origin: string, error: any) {
    let message = 'Error';
    if(typeof error === 'object' || typeof error === 'symbol') {
      if(error['message']) message = error.message;
      if(error['error']) {
        if(
          (
            typeof error.error === 'object' ||
            typeof error.error === 'symbol'
          ) &&
          error.error['message']
        ) message = error.error.message;
      }
    }
    else message = error;
    message = `${origin}: ${message}`;
    const toast = await this.toastCtrl.create({
      message,
      color : 'danger',
      duration: 3700
    });
    toast.present();
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertCtrl.create(options)
    await alert.present();
    return alert;
  }

}
