import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'dashboard', loadChildren:() => import ('./dashboard/dashboard.module').then(m=> m.DashboardPageModule)
  },
  {path:'notifications',loadChildren:()=> import('./notifications/notifications.module').then(m=>m.NotificationsPageModule)
},   {
    path: 'get-info',
    loadChildren: () => import('./get-info/get-info.module').then( m => m.GetInfoPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'sample',
    loadChildren: () => import('./sample/sample.module').then( m => m.SamplePageModule)
  },
 
]
 



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }