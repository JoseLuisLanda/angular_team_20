import { Component, OnInit } from '@angular/core';
import { LoginFacebook } from 'src/app/firebase/auth/login-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginFacebook: LoginFacebook) { }

  ngOnInit(): void {
    this.loginFacebook.handle();
  }

}
