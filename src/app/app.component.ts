import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { FcmService } from './services/fcm.service';
import { StorageService } from './services/storage.service';
import { DashboardPage } from './members/dashboard/dashboard.page';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  activePageTitle = 'Dashboard';
  appPages = [
    {
      title: 'Dashboard',
      url: 'members/dashboard',
      icon: 'albums',
    },
    {
      title: 'Notification',
      url: 'members/notifications',
      icon: 'list',
    },
   
  ];
  username: string;
  email: any;
  constructor(
    private api: ApiService,
    private fcm: FcmService,
    private storageService: StorageService,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    this.storageService.name().then((res) => {
      this.username = res.value;
      console.log('sidemenu' + this.username);
    });
    this.storageService.email().then((res) => {
      this.email = res.value;
      console.log('sidemenu' + this.email);
    });
  }

  logout() {
    this.api.logout();
  }
}
