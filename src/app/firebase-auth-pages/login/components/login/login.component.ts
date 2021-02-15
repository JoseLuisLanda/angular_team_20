import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginThirdParties } from 'src/app/firebase/auth/login-third-parties';
import { LoginWithCredentials } from 'src/app/firebase/auth/login-with-credential';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authButtonActionEvent: AuthButtonActionEvent,
    private loginWithCredentials: LoginWithCredentials,
    protected router: Router,
    private loginThirdParties: LoginThirdParties) { }

  ngOnInit(): void {
    this.authButtonActionEvent.event$.next({
      login: false,
      register: true
    });
  }

  login(form: any) {
    this.loginWithCredentials.handle(form.email, form.password)
      .then(this.loginWithCredentialsOk.bind(this))
      .catch(this.loginWithCredentialsErr.bind(this));
  }

  protected loginWithCredentialsOk(response: any) {
    console.log("loginWithCredentials ok", response);
    this.router.navigate(['main']);
  }

  protected loginWithCredentialsErr(response: any) {
    console.log("loginWithCredentialsErr ok", response);
  }

  loginFacebook(event: any) {
    this.loginThirdParties.facebook()
      .then(this.loginThirdPartiesOk.bind(this))
      .catch(this.loginThirdPartiesErr.bind(this));
  }

  protected loginThirdPartiesOk(response: any) {
    console.log("loginThirdParties facebook ok", response);
    this.router.navigate(['main']);
  }

  protected loginThirdPartiesErr(response: any) {
    if(this.isAccountExistsWithDifferentCredential(response.code)){
      alert("isAccountExistsWithDifferentCredential: "+ JSON.stringify(response));
    }
  }

  cambiarContrasenia(form: any) {
    console.log("si frao", form);
    this.router.navigate(['auth/send-password-reset', form.email]);
  }

  protected isAccountExistsWithDifferentCredential(code: any) {
    return  "auth/account-exists-with-different-credential" === code;
  }

  register() {
    this.router.navigate(['auth/register']);
  }
}
