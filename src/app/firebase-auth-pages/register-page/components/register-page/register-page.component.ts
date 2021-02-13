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
    let self = this;
    let handlers = {
      success(response: any) {
        console.log("registerUser ok", response);
        self.router.navigate(['auth/login']);
      },
      error(response: any) {
        if(self.isUserRegister(response.code)) {
          alert("isUserregister error: " + JSON.stringify(response));
        }
      }
    };

    this.registerUser.handle(form.email, form.password)
      .then(handlers.success)
      .catch(handlers.error)
  }

  protected isUserRegister(code: any) {
    let isUserRegister = 'auth/email-already-in-use';
    return code === isUserRegister;
  }

}
