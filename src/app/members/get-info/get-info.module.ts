import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetInfoPageRoutingModule } from './get-info-routing.module';

import { GetInfoPage } from './get-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetInfoPageRoutingModule
  ],
  declarations: [GetInfoPage]
})
export class GetInfoPageModule {}
