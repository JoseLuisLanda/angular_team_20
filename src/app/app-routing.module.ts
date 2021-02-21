import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import { CopyrightComponent } from './pages/copyright/copyright.component';
import { TermsprivacyComponent } from './pages/termsprivacy/termsprivacy.component';
import { VerificationEmailComponent } from './pages/utils/verification-email/verification-email.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'copyright', component: CopyrightComponent},
  {path: 'verification', component: VerificationEmailComponent},
  {path: 'terms', component: TermsprivacyComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
