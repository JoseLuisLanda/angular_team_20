import { Component, OnInit } from '@angular/core';
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

  constructor(
    private registerUser: RegisterUser,
    private loginWithCredentials: LoginWithCredentials,
    private _logout: Logout,
    private loginThirdParties: LoginThirdParties) { }

  ngOnInit(): void {
    this.loginThirdParties.facebook();
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



}
