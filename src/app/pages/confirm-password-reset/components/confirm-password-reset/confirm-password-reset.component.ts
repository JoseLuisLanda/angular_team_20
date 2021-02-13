import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {

  constructor(
    private authButtonActionEvent: AuthButtonActionEvent,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    this.resetAuthButtonAction();
  }

  protected resetAuthButtonAction() {
    this.authButtonActionEvent.event$.next({
      login: true,
      register: false
    });
  }

  confirmarPasswordResetAction(form: any) {
    console.log("ConfirmPasswordResetComponent", form);
  }

}
