import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';
import { MenuController } from '@ionic/angular';
import { DashboardPage } from 'src/app/members/dashboard/dashboard.page';
import { ApiService } from 'src/app/services/api.service';
import { FcmService } from 'src/app/services/fcm.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit {
  device_id: string;
    constructor(
      private loader:LoaderService,
      private api:ApiService,
     public fcm:FcmService,
     private Toast:ToastService,
     private storageService:StorageService,
     public menuCtrl: MenuController,
     private bar:DashboardPage

    ){}
     
  username:string
  password :string
  isTypePassword: boolean = true;

  send() {
    this.api.login(this.username,this.password);    
    }

  ngOnInit() 
  {//this.fcm.fcmInit();
    this.menuCtrl.enable(false)
   this.bar.bar();
    
  }
    onChange() {
      this.isTypePassword = !this.isTypePassword;
    }
}



    



