import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendPasswordResetEmail } from 'src/app/firebase/auth/send-password-reset-email';
import { AuthButtonActionEvent } from 'src/app/layouts/components/auth-button-action/auth-button-action.event';

@Component({
  selector: 'app-send-password-reset-email',
  templateUrl: './send-password-reset-email.component.html',
  styleUrls: ['./send-password-reset-email.component.css']
})
export class SendPasswordResetEmailComponent implements OnInit {

  public debug = true;
  public email = "";

  constructor(
    private authButtonActionEvent: AuthButtonActionEvent,
    private activatedRoute: ActivatedRoute,
    private _sendPasswordResetEmail: SendPasswordResetEmail) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    this.updateCorreo(params.email);
    this.resetAuthButtonAction();
    this.sendPasswordResetEmail(params.email);
  }

  public updateCorreo(email: any) {
    this.email = email;
  }

  protected resetAuthButtonAction() {
    this.authButtonActionEvent.event$.next({
      login: true,
      register: false
    });
  }

  protected sendPasswordResetEmail(email: any) {
    this._sendPasswordResetEmail.handle(email)
      .then(this.sendPasswordResetEmailOk.bind(this))
      .catch(this.sendPasswordResetEmailError.bind(this));
  }

  protected sendPasswordResetEmailOk(response: any) {
    console.log("sendPasswordResetEmailOk", response);
  }

  protected sendPasswordResetEmailError(response: any) {
    console.log("sendPasswordResetEmailError", response);
  }



}
