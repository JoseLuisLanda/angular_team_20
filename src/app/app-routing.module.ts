import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [{
      path: 'welcome',
      loadChildren: () => import('./pages/welcome/welcome.module').then(
        module => module.WelcomeModule
      )
    }]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(
        module => module.LoginModule
      )
    }, {
      path: 'register',
      loadChildren: () => import('./pages/register-page/register-page.module').then(
        module => module.RegisterPageModule
      )
    }, {
      path: 'send-password-reset/:email',
      loadChildren: () => import('./pages/send-password-reset-email/send-password-reset-email.module').then(
        module => module.SendPasswordResetEmailModule
      )
    }, {
      path: 'confirm-password-reset/:code',
      loadChildren: () => import('./pages/confirm-password-reset/confirm-password-reset.module').then(
        module => module.ConfirmPasswordResetModule
      )
    }, {
      path: 'email-validation-callback/:mode/:code',
      loadChildren: () => import('./pages/email-validation/email-validation.module').then(
        module => module.EmailValidationModule
      )
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
