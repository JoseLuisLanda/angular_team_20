import { Component, OnInit } from '@angular/core';
import { LoginFacebook } from 'src/app/firebase/auth/login-facebook';
import { RegisterUser } from 'src/app/firebase/auth/register-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private registerUser: RegisterUser,
    private loginFacebook: LoginFacebook) { }

  ngOnInit(): void {
    this.loginFacebook.handle();
  }

  registrarUsuario() {
    this.registerUser.handle('naiger67@gmail.com', '1234567');
  }

}
