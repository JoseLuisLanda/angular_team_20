import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './layouts/guards/auth-guard';

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
      path: 'apply-action-code/:code',
      loadChildren: () => import('./firebase-auth-pages/apply-action-code/apply-action-code.module').then(
        module => module.ApplyActionCodeModule
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
    canActivate: [AuthGuard],
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
    }, {
      path: 'confirm-password-reset/:code',
      loadChildren: () => import('./firebase-auth-pages/confirm-password-reset/confirm-password-reset.module').then(
        module => module.ConfirmPasswordResetModule
      )
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
