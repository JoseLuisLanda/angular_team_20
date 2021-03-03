import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import { CopyrightComponent } from './pages/copyright/copyright.component';
import { TermsprivacyComponent } from './pages/termsprivacy/termsprivacy.component';
import { VerificationEmailComponent } from './pages/utils/verification-email/verification-email.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
 // {path:'',outlet:'sponsor', loadChildren: () => import('./pages/section/sponsor/sponsor.module').then(mod => mod.SponsorModule)},
  // {path:'course',loadChildren: () => import('./pages/section/course/course.module').then(mod => mod.CourseModule)},
  // {path:'comunidad',loadChildren: () => import('./pages/section/comunidad/comunidad.module').then(mod => mod.ComunidadModule)},
  // {path: 'sponsorList', component: SponsorsComponent},
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        outlet: 'sponsor',
        loadChildren: () => import('./pages/section/sponsor/sponsor.module').then(mod => mod.SponsorModule)
      },
      {
        path: '',
        outlet: 'comunidad',
        loadChildren: () => import('./pages/section/comunidad/comunidad.module').then(mod => mod.ComunidadModule)
      },
      {
        path: '',
          outlet: 'course',
          loadChildren: () => import('./pages/section/course/course.module').then(mod => mod.CourseModule)
      },
      {
        path: '',
        outlet: 'counter',
        loadChildren: () => import('./pages/section/counter/counter.module').then( mod => mod.CounterModule)
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'copyright', component: CopyrightComponent},
  {path: 'verification', component: VerificationEmailComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'terms', component: TermsprivacyComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
