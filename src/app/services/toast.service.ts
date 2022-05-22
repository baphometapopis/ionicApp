import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2000,
    });
    toast.present();
  }
  async notifyToast() {
    const toast = await this.toastController.create({
      message: 'You got New Notification',
      animated: true,
      position: 'top',
      duration: 3000,
    });

    toast.present();
  }
}
