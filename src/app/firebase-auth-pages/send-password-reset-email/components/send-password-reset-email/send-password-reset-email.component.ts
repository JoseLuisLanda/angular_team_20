import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SendPasswordResetEmail } from 'src/app/firebase/auth/send-password-reset-email';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-password-reset-email',
  templateUrl: './send-password-reset-email.component.html',
  styleUrls: ['./send-password-reset-email.component.css']
})
export class SendPasswordResetEmailComponent implements OnInit {

  public debug = environment.firebaseDebug;
  public email = "";
  public isSendEmail = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _sendPasswordResetEmail: SendPasswordResetEmail) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    this.updateCorreo(params.email);
  }

  public updateCorreo(email: any) {
    this.email = email;
  }

  sendPasswordResetEmailAction() {
    this.sendPasswordResetEmail(this.email);
  }

  protected sendPasswordResetEmail(email: any) {
    this._sendPasswordResetEmail.handle(email)
      .then(this.sendPasswordResetEmailOk.bind(this))
      .catch(this.sendPasswordResetEmailError.bind(this));
  }

  protected sendPasswordResetEmailOk(response: any) {
    alert("sendPasswordResetEmailOk: "+ JSON.stringify(response));
    this.isSendEmail = true;

  }

  protected sendPasswordResetEmailError(response: any) {
    if(this.isUserNotFound(response.code)) {
      alert("sendPasswordResetEmailError: "+ JSON.stringify(response));
    }
  }

  protected isUserNotFound(code: any) {
    return "auth/user-not-found" === code;
  }

  confirmar(code: any) {
    this.router.navigate(['auth/confirm-password-reset', code]);
  }

  login() {
    this.router.navigate(['auth/login']);
  }

  register() {
    this.router.navigate(['auth/register']);
  }

}
