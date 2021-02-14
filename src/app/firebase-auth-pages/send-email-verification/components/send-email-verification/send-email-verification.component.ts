import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/firebase/auth/current-user';
import { SendEmailVerification } from 'src/app/firebase/auth/send-email-verification';

@Component({
  selector: 'app-send-email-verification',
  templateUrl: './send-email-verification.component.html',
  styleUrls: ['./send-email-verification.component.css']
})
export class SendEmailVerificationComponent implements OnInit {

  public email = "";
  public debug = true;

  constructor(
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
    //this.sendEmailVerification();
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
    console.log("sendEmailVerificationOk: "+ JSON.stringify(response));
  }

  protected sendEmailVerificationErr(response: any) {
    console.log("sendEmailVerificationErr: "+ JSON.stringify(response));
  }

}
