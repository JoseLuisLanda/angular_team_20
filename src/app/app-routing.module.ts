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
import { PrincipalComponent } from './pages/perfil/principal/principal.component';


const routes: Routes = [
 // {path:'',outlet:'sponsor', loadChildren: () => import('./pages/section/sponsor/sponsor.module').then(mod => mod.SponsorModule)},
  // {path:'course',loadChildren: () => import('./pages/section/course/course.module').then(mod => mod.CourseModule)},
  // {path:'comunidad',loadChildren: () => import('./pages/section/comunidad/comunidad.module').then(mod => mod.ComunidadModule)},
  // {path: 'sponsorList', component: SponsorsComponent},
 
      // {
      //   path: 'sponsor',
      //   outlet: 'sponsor',
      //   loadChildren: () => import('./pages/section/sponsor/sponsor.module').then(mod => mod.SponsorModule)
      // },
      // {
      //   path: 'comunidad',
      //   outlet: 'comunidad',
      //   loadChildren: () => import('./pages/section/comunidad/comunidad.module').then(mod => mod.ComunidadModule)
      // },
      // {
      //   path: 'course',
      //     outlet: 'course',
      //     loadChildren: () => import('./pages/section/course/course.module').then(mod => mod.CourseModule)
      // },
      // {
      //   path: 'counter',
      //   outlet: 'counter',
      //   loadChildren: () => import('./pages/section/counter/counter.module').then( mod => mod.CounterModule)
      // }
   
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'copyright', component: CopyrightComponent},
  {path: 'verification', component: VerificationEmailComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'terms', component: TermsprivacyComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( mod => mod.PerfilModule)
  },
  {path: '**', redirectTo: 'login'}
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
