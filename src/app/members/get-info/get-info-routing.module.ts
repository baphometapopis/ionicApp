import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetInfoPage } from './get-info.page';

const routes: Routes = [
  {
    path: '',
    component: GetInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetInfoPageRoutingModule {}
