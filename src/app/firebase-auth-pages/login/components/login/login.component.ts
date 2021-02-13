import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginThirdParties } from 'src/app/firebase/auth/login-third-parties';
import { LoginWithCredentials } from 'src/app/firebase/auth/login-with-credential';
import { Logout } from 'src/app/firebase/auth/logout';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

    let handlers = {
      success(response: any) {
        console.log("loginWithCredentials ok", response);
      },
      error(response: any) {
        console.log("loginWithCredentials error", response);
      }
    };

    this.loginWithCredentials.handle(form.email, form.password)
      .then(handlers.success.bind(this))
      .catch(handlers.error.bind(this));
  }

  logout() {
    this._logout.handle();
  }

  loginFacebook(event: any) {
    let handlers = {
      success(response: any) {
        console.log("loginThirdParties facebook ok", response);
      },
      error(response: any) {
        console.log("loginThirdParties facebook error", response);
      }
    };

    this.loginThirdParties.facebook()
      .then(handlers.success.bind(this))
      .catch(handlers.error.bind(this));
  }

  cambiarContrasenia(form: any) {
    this.router.navigate(['auth/send-password-reset', form.email]);
  }
}
