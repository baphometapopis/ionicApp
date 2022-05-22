import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthenticateService } from './authenticate.service';
import { FcmService } from './fcm.service';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  login_response: any;
  auth_token: any;
  url = 'https://support.openwingsit.com/api/v1/';
  response: any;
  device_id: any;
  checkStorage: Promise<void>;
  username: any;

  constructor(
    private router: Router,
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public Toast: ToastService,
    public storageService: StorageService,
    public auth: AuthenticateService,
    public platform: Platform,
    public fcm: FcmService
  ) {}

  login(username, password) {
    let header = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    let options = { headers: header };
    let postData = {
      user: {
        email: username,
        password: password,
        selected_permission_id: 2,
      },
    };

    this.httpClient
      .post(this.url + 'login', postData, options)
      .toPromise()
      .then(
        (res) => {
          this.login_response = res;
          console.log(res);
          if (this.login_response.status == 'success') {
            this.storageService.setString(
              'session_token',
              this.login_response.token
            );
            this.storageService.setString(
              'user_name',
              this.login_response.name
            );
            this.storageService.setString(
              'user_email',
              this.login_response.email
            );
          }
          this.addDevice();
        },
        (error) => {
          this.Toast.presentToast('please enter Valid Username/Password');
          console.log(error);
        }
      );
    this.storageService.getString('device_id').then((res) => {
      this.device_id = res.value;
    });
    this.storageService.getString('user_name').then((res) => {
      this.username = res.value;
    });
  }

  addDevice() {
    this.storageService.getString('session_token').then((res) => {
      this.auth_token = res.value;
      console.log(this.auth_token);

      let header = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.auth_token,
      });
      let options = { headers: header };

      let deviceData = {
        req: {
          device_id: this.device_id,
        },
      };
      this.httpClient
        .post(this.url + 'addDevice', deviceData, options)
        .toPromise()
        .then((res) => {
          this.response = res;
          console.log(JSON.stringify(res));
          if (this.response.status == 'success') {
            this.username = this.response.res;
            this.router.navigate(['members', 'dashboard']);
            this.auth.authenticationState.next(true);
            this.Toast.presentToast('Logged in successfully');
            window.location.reload();
          } else {
            this.Toast.presentToast('login failed');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  logout() {
    this.storageService.getString('device_id').then((res) => {
      this.device_id = res.value;
    });    this.storageService.getString('session_token').then((res) => {
      this.auth_token = res.value;

      let header = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.auth_token,
      });

      let options = { headers: header };
      let logoutData = {
        req: {
          device_id: this.device_id,
        },
      };

      this.httpClient.post(this.url + 'logout', logoutData, options).subscribe(
        (res) => {
          this.response = res;
          console.log(JSON.stringify(res));
         // this.Toast.presentToast(this.response.message)
        },
        (error) => {
          console.log(error);
        }
      );
    });
    this.router.navigate(['login']);
    this.storageService.clear();
    this.auth.authenticationState.next(false);
    this.Toast.presentToast('logged out successfully');

  }

  
}
