import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginThirdParties } from 'src/app/firebase/auth/login-third-parties';
import { LoginWithCredentials } from 'src/app/firebase/auth/login-with-credential';
import { Logout } from 'src/app/firebase/auth/logout';
import { RegisterUser } from 'src/app/firebase/auth/register-user';
import { CurrentUserReload } from 'src/app/firebase/auth/current-user-reload';
import { SendPasswordResetEmail } from 'src/app/firebase/auth/send-password-reset-email';
import { ConfirmPasswordReset } from 'src/app/firebase/auth/confirm-password-reset';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public verification:any = {
    mode: 'verifyEmail',
    code: ''
  };

  public confirmarPass:any = {
    password: '',
    code: ''
  };
  constructor(
    private authButtonActionEvent: AuthButtonActionEvent,
    private loginWithCredentials: LoginWithCredentials,
    private _logout: Logout,
    protected router: Router,
    private loginThirdParties: LoginThirdParties) { }

  ngOnInit(): void {
    this.authButtonActionEvent.event$.next({
      login: false,
      register: true
    });
  }

  login(form: any) {
    console.log('login', form);
    /*this.loginWithCredentials.handle(form.email, form.password).then((response)=>{
      //
    });*/
  }

  logout() {
    this._logout.handle();
  }

  loginFacebook(event: any) {
    console.log('login con facebook', 898);
    //this.loginThirdParties.facebook();
  }

  cambiarContrasenia(form: any) {
    this.router.navigate(['auth/send-password-reset', form.email]);
  }
}
