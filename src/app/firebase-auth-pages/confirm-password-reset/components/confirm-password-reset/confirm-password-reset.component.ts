import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPasswordReset } from 'src/app/firebase/auth/confirm-password-reset';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {

  constructor(
    private _confirmPasswordReset: ConfirmPasswordReset,
    private authButtonActionEvent: AuthButtonActionEvent,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.getParams();
    this.resetAuthButtonAction();
  }

  protected getParams() {
    return this.activatedRoute.snapshot.params;
  }

  protected resetAuthButtonAction() {
    this.authButtonActionEvent.event$.next({
      login: true,
      register: false
    });
  }

  confirmarPasswordResetAction(form: any) {
    console.log("ConfirmPasswordResetComponent", form);
    let params = this.getParams();
    let code = params['code'];
    this.confirmPasswordReset(code, form.password);
  }

  confirmPasswordReset(code: any, password: any) {
    this._confirmPasswordReset.handle(code, password);
  }

}
