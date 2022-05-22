import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {checkstorage: any;
  device_id: string;

  constructor(
    private Toast: ToastService,
    private storageService: StorageService,
    private router: Router,
    public toast: ToastService,
    private navctrl: NavController,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  authenticationState = new BehaviorSubject(false);
  checkToken() {
    this.storageService.getString('session_token').then((res) => {
      console.log('check token' + this.authenticationState.value);

      if (res.value !== null) {
        this.authenticationState.next(true);
        this.router.navigate(['members', 'dashboard']);
        console.log('check token' + this.authenticationState.value);
        console.log(res);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
