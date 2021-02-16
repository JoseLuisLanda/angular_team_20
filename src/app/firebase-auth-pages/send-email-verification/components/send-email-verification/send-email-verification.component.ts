import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/firebase/auth/current-user';
import { SendEmailVerification } from 'src/app/firebase/auth/send-email-verification';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-email-verification',
  templateUrl: './send-email-verification.component.html',
  styleUrls: ['./send-email-verification.component.css']
})
export class SendEmailVerificationComponent implements OnInit {

  public email = "";
  public debug = environment.firebaseDebug;
  public isSendMail = false;

  constructor(
    private router: Router,
    private _currentUser: CurrentUser,
    private _sendEmailVerification: SendEmailVerification) { }

  ngOnInit(): void {
    this.currentUser();
  }
  
  protected currentUser() {
    this._currentUser.handle().subscribe(
      this.currentUserOk.bind(this), 
      this.currentUserdErr.bind(this)
    );
  }

  protected currentUserOk(response: any) {
    this.email = response.email;
  }

  sendMail() {
    this.sendEmailVerification();
  }

  protected currentUserdErr(response: any) {
    console.log("currentUserdErr: "+ JSON.stringify(response));
    throw response;
  }

  protected sendEmailVerification() {
    this._sendEmailVerification.handle()
      .then(this.sendEmailVerificationOk.bind(this))
      .catch(this.sendEmailVerificationErr.bind(this));
  }

  protected sendEmailVerificationOk(response: any) {
    alert("sendEmailVerificationOk: "+ JSON.stringify(response));
    this.isSendMail = true;
  }

  protected sendEmailVerificationErr(response: any) {
    alert("sendEmailVerificationErr: "+ JSON.stringify(response));
  }

  confirmar(code: any) {
    this.router.navigate(['main/apply-action-code', code]);
  }

}
