import { Injectable, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { Router } from '@angular/router';
//import { HttpClient,HttpHeaders} from '@angular/common/http';
import {
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Token,
  ActionPerformed,
  PushNotificationSchema,
} from '@capacitor/push-notifications';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import {
  HttpClient,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

import { Storage } from '@ionic/storage';
import { toastController } from '@ionic/core';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  deviceId: any;
  stor: string;
  devicevalue: any;
  message: any;
  title: any;
  body: any;
  auth: any;
  device_id: any;

  constructor(
    private router: Router,
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public Toast: ToastService,
    public storageService: StorageService
  ) {}

  fcmInit() {
    console.log('Initializing FCM');
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token) => {
      this.device_id = token.value;
      this.storageService.setString('device_id', this.device_id);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived',(notification: PushNotificationSchema) => {
        console.log('push notification received:' + notification);
        this.Toast.notifyToast();
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log('push notification received:' + notification.notification);
        console.log('push Action performed');
        console.log('Action performed: ' + JSON.stringify(notification));
        this.router.navigate(['members', 'notifications']);

      }
    );

    this.storageService.getString('device_id').then((res) => {
      console.log('device_id :' + res.value);
      this.device_id = res.value;
    });
  }
}
