import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [{
        path: 'welcome', 
        loadChildren: () => import('./pages/welcome/welcome.module').then(
        module=>module.WelcomeModule
      )},{
        path: 'cat-list', 
        component: CatListComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
