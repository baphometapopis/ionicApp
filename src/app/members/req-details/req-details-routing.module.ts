import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqDetailsPage } from './req-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReqDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqDetailsPageRoutingModule {}
