import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private loader:LoadingController
  ) { }

  
  simpleLoader() {
    this.loader.create({
        message: 'Loading...'
    }).then((response) => {
        response.present();
    });
}

dismissLoader() {
  this.loader.dismiss().then((response) => {
      console.log('Loader closed!', response);
  }).catch((err) => {
      console.log('Error occured : ', err);
  });
}
 autoLoader() {
  this.loader.create({
    message: 'Loading',
    duration: 10000
  }).then((response) => {
    response.present();
    response.onDidDismiss().then((response) => {
      console.log('Loader dismissed', response);
    });
  });
}   
 
}