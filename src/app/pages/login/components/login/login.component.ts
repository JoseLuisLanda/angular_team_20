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
    private _confirmPasswordReset: ConfirmPasswordReset,
    private registerUser: RegisterUser,
    private loginWithCredentials: LoginWithCredentials,
    private currentUserReload: CurrentUserReload,
    private sendPasswordResetEmail: SendPasswordResetEmail,
    private _logout: Logout,
    protected router: Router,
    private loginThirdParties: LoginThirdParties) { }

  ngOnInit(): void {
    this.authButtonActionEvent.event$.next({
      login: false,
      register: true
    });
  }

  registrarUsuario() {
    this.registerUser.handle('naiger67@gmail.com', '1234567');
  }

  login(form: any) {
    console.log('login', form);

    /*this.loginWithCredentials.handle(form.email, form.password).then((response)=>{
      console.log(response);
    });*/
  }

  logout() {
    this._logout.handle();
  }

  loginFacebook(event: any) {
    console.log('login con facebook', 898);
    //this.loginThirdParties.facebook();
  }

  emailValidationCallback() {
    let mode = this.verification.mode;
    let code = this.getCode(this.verification.code);
    this.router.navigate(['auth/email-validation-callback', mode, code]);
  }

  verifyUser() {
    this.currentUserReload.handle()?.then((currentUser)=>{
      console.log("currentUser", currentUser);
    });
  }

  cambiarContrasenia(form: any) {
    console.log('form2', form);
    //this.sendPasswordResetEmail.handle(form.email);
  }

  confirmPasswordReset() {
    let code = this.getCode(this.confirmarPass.code);
    console.log(code);
    this._confirmPasswordReset.handle(
      code, 
      this.confirmarPass.password
    );
  }

  protected getCode(_code: any) {
    let code = _code.split('&')[1].substring("oobCode=".length);
    return code;
  }
}
