import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatListComponent } from './components/cat-list/cat-list.component';

const routes: Routes = [
  {path: '', loadChildren: './pages/welcome/welcome.module#WelcomeModule'},
  {path: 'cat-list', component: CatListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
