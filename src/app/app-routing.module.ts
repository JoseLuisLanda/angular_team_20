import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginGuard } from './firebase/guards/login-guard';
import { AuthGuard } from './firebase/guards/auth-guard';

const routes: Routes = [
  {
    path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(
      module => module.WelcomeModule
    )
  }, {
    path: 'main',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'profile-user',
      loadChildren: () => import('./firebase-auth-pages/profile-user/profile-user.module').then(
        module => module.ProfileUserModule
      )
    }, {
      path: 'send-email-verification',
      loadChildren: () => import('./firebase-auth-pages/send-email-verification/send-email-verification.module').then(
        module => module.SendEmailVerificationModule
      )
    }]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [LoginGuard],
    children: [{
      path: 'login',
      loadChildren: () => import('./firebase-auth-pages/login/login.module').then(
        module => module.LoginModule
      )
    }, {
      path: 'register',
      loadChildren: () => import('./firebase-auth-pages/register-page/register-page.module').then(
        module => module.RegisterPageModule
      )
    }, {
      path: 'send-password-reset/:email',
      loadChildren: () => import('./firebase-auth-pages/send-password-reset-email/send-password-reset-email.module').then(
        module => module.SendPasswordResetEmailModule
      )
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
