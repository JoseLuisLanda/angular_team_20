import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginThirdParties } from 'src/app/firebase/auth/login-third-parties';
import { LoginWithCredentials } from 'src/app/firebase/auth/login-with-credential';
import { Logout } from 'src/app/firebase/auth/logout';
import { RegisterUser } from 'src/app/firebase/auth/register-user';

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
  constructor(
    private registerUser: RegisterUser,
    private loginWithCredentials: LoginWithCredentials,
    private _logout: Logout,
    protected router: Router,
    private loginThirdParties: LoginThirdParties) { }

  ngOnInit(): void {
    
  }

  registrarUsuario() {
    this.registerUser.handle('naiger67@gmail.com', '1234567');
  }

  login() {
    this.loginWithCredentials.handle('naiger67@gmail.com', '1234567');
  }

  logout() {
    this._logout.handle();
  }

  loginFacebook() {
    this.loginThirdParties.facebook();
  }

  emailValidationCallback() {
    let mode = this.verification.mode;
    let code = this.getCode();
    this.router.navigate(['auth/email-validation-callback', mode, code]);
  }

  protected getCode() {
    let code = this.verification.code.split('&')[1].substring("oobCode=".length);
    return code;
  }
}
