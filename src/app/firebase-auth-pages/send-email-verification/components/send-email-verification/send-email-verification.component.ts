import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SendEmailVerification } from 'src/app/firebase/auth/send-email-verification';
import { SetUserData } from 'src/app/firebase/auth/set-user-data';

@Component({
  selector: 'app-send-email-verification',
  templateUrl: './send-email-verification.component.html',
  styleUrls: ['./send-email-verification.component.css']
})
export class SendEmailVerificationComponent implements OnInit {

  public email = "";
  public debug = true;
  constructor(
    private _firebaseAuth: AngularFireAuth,
    private setUserData: SetUserData,
    private sendEmailVerification: SendEmailVerification) { }

  ngOnInit(): void {
    this.currentUser();
  }

  
  protected currentUser() {
    this._firebaseAuth.authState.subscribe(
      this.currentUserOk.bind(this), 
      this.currentUserdErr.bind(this)
    );
  }

  protected currentUserOk(response: any) {
    this.setUserData.handle(response)
      .then(this.setUserDataOk.bind(this))
      .catch(this.setUserDataErr.bind(this));
  }

  protected currentUserdErr(response: any) {
    console.log("currentUserdErr: "+ JSON.stringify(response));
  }

  protected setUserDataOk(response: any) {
    console.log("setUserDataOk", response);
    this.email = response.email;
    this.verificarEmail();
  }

  protected setUserDataErr(response: any) {
    console.log("setUserDataErr", response);
  }

  protected verificarEmail() {
    this.sendEmailVerification.handle()
      .then(this.verificarEmailOk.bind(this))
      .catch(this.verificarEmailError.bind(this))
  }

  protected verificarEmailOk(response: any) {
    console.log("verificarEmailOk: "+ JSON.stringify(response));
  }

  protected verificarEmailError(response: any) {
    console.log("verificarEmailError: "+ JSON.stringify(response));
  }

}
