import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginThirdParties } from 'src/app/firebase/auth/login-third-parties';
import { LoginWithCredentials } from 'src/app/firebase/auth/login-with-credential';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthSession } from 'src/app/services/auth-session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginFormComponent") loginFormComponent: LoginFormComponent | undefined;

  public isShowRestablecerPassword = {
    email: '',
    disabled: true
  };
  
  constructor(
    private loginWithCredentials: LoginWithCredentials,
    protected router: Router,
    protected afAuth: AngularFireAuth,
    private authSession: AuthSession,
    private loginThirdParties: LoginThirdParties) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.loginFormComponent?.isShowRestablecerPassword$().subscribe((event)=>{
      //console.log("isShowRestablecerPassword", event);
      this.setIsShowRestablecerPassword(event); 
    });

    this.loginFormComponent?.redirectMain$.subscribe((user)=>{
      this.authSession.setAuthUser(user);
      this.router.navigate(['main']);
    });
  }

  protected setIsShowRestablecerPassword(isShowRestablecerPassword: any) {
    this.isShowRestablecerPassword = isShowRestablecerPassword;
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
    if(this.isUserNotFound(response.code)) {
      alert("isUserNotFound: "+ JSON.stringify(response));
    }

    if(this.isWrongPassword(response.code)) {
      alert("isWrongPassword: "+ JSON.stringify(response));
    }

    if(this.toManyRequest(response.code)) {
      alert("toManyRequest: "+ JSON.stringify(response));
    }
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

  cambiarContrasenia() {
    this.router.navigate(['auth/send-password-reset', this.isShowRestablecerPassword.email]);
  }

  protected isAccountExistsWithDifferentCredential(code: any) {
    return  "auth/account-exists-with-different-credential" === code;
  }

  protected isUserNotFound(code: any) {
    return  "auth/user-not-found" === code;
  }

  protected isWrongPassword(code: any) {
    return  "auth/wrong-password" === code;
  }

  protected toManyRequest(code: any) {
    return  "auth/too-many-requests" === code;
  }

  register() {
    this.router.navigate(['auth/register']);
  }
}
