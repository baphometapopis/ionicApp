import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqDetailsPageRoutingModule } from './req-details-routing.module';

import { ReqDetailsPage } from './req-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqDetailsPageRoutingModule
  ],
  declarations: [ReqDetailsPage]
})
export class ReqDetailsPageModule {}
