import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/firebase/auth/register-user';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private router: Router,
    private registerUser: RegisterUser,
    private authButtonActionEvent: AuthButtonActionEvent) { }

  ngOnInit(): void {
    this.authButtonActionEvent.event$.next({
      login: true,
      register: false
    });
  }

  register(form: any) {
    this.registerUser.handle(form.email, form.password)
      .then(this.registerOk.bind(this))
      .catch(this.registerErr.bind(this))
  }

  protected registerOk(response: any) {
    console.log("registerUser ok", response);
    this.router.navigate(['auth/login']);
  }

  protected registerErr(response: any) {
    if(this.isUserRegister(response.code)) {
      alert("isUserregister error: " + JSON.stringify(response));
    }
  }

  protected isUserRegister(code: any) {
    let isUserRegister = 'auth/email-already-in-use';
    return code === isUserRegister;
  }

}
