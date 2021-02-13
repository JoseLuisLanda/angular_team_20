import { Component, NgZone, OnInit } from '@angular/core';
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
    let self = this;
    let handlers = {
      success(response: any) {
        console.log("loginWithCredentials ok", response);
        self.router.navigate(['main']);
      },
      error(response: any) {
        console.log("loginWithCredentials error", response);
      }
    };

    this.loginWithCredentials.handle(form.email, form.password)
      .then(handlers.success)
      .catch(handlers.error);
  }

  logout() {
    this._logout.handle();
  }

  loginFacebook(event: any) {
    let self = this;
    let handlers = {
      success(response: any) {
        console.log("loginThirdParties facebook ok", response);
        self.router.navigate(['main']);
      },
      error(response: any) {
        if(self.isAccountExistsWithDifferentCredential(response.code)){
          alert("isAccountExistsWithDifferentCredential: "+ JSON.stringify(response));
        }
      }
    };

    this.loginThirdParties.facebook()
      .then(handlers.success)
      .catch(handlers.error);
  }

  cambiarContrasenia(form: any) {
    this.router.navigate(['auth/send-password-reset', form.email]);
  }

  protected isAccountExistsWithDifferentCredential(code: any) {
    return  "auth/account-exists-with-different-credential" === code;
  }
}
