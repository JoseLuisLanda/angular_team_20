import { Component, OnInit } from '@angular/core';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private authButtonActionEvent: AuthButtonActionEvent) { }

  ngOnInit(): void {
    this.authButtonActionEvent.event$.next({
      login: true,
      register: false
    });
  }

}
