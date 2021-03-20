import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import { CopyrightComponent } from './pages/copyright/copyright.component';
import { TermsprivacyComponent } from './pages/termsprivacy/termsprivacy.component';
import { VerificationEmailComponent } from './pages/utils/verification-email/verification-email.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CounterComponent } from './pages/section/counter/counter.component';
import { SponsorsComponent } from './shared/components/sponsor/sponsors.component';
import { ProfiledetailsComponent } from './pages/profile/profiledetails/profiledetails.component';
import { ProfilegruposComponent } from './pages/profile/profilegrupos/profilegrupos.component';
import { ProfileinsigniasComponent } from './pages/profile/profileinsignias/profileinsignias.component';
import { ProfileventosComponent } from './pages/profile/profileventos/profileventos.component';
import { ProfileeditComponent } from './pages/profile/profileedit/profileedit.component';

const routes: Routes = [
 // {path:'',outlet:'sponsor', loadChildren: () => import('./pages/section/sponsor/sponsor.module').then(mod => mod.SponsorModule)},
  //{path:'course',loadChildren: () => import('./pages/section/course/course.module').then(mod => mod.CourseModule)},
  //{path:'comunidad',loadChildren: () => import('./pages/section/comunidad/comunidad.module').then(mod => mod.ComunidadModule)},
  //{path: 'sponsorList', component: SponsorsComponent},
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
    }
    ]
  },
  {path: 'profiledetails', component: ProfiledetailsComponent},
  {path: 'profileedit', component: ProfileeditComponent},
  {path: 'profilegrupos', component: ProfilegruposComponent},
  {path: 'profileinsignias', component: ProfileinsigniasComponent},
  {path: 'profileventos', component: ProfileventosComponent},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'copyright', component: CopyrightComponent},
  {path: 'verification', component: VerificationEmailComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'terms', component: TermsprivacyComponent},
  {path: 'counter', component: CounterComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'home'},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
