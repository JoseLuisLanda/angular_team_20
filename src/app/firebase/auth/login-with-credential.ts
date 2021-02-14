import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SendEmailVerification } from "./send-email-verification";
import { SetUserData } from "./set-user-data";

@Injectable({providedIn: 'root'})
export class LoginWithCredentials {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth,
    protected _sendEmailVerification: SendEmailVerification,
    protected _setUserData: SetUserData) {}

  handle(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(this.setUserData.bind(this))
      //.then(this.sendEmailVerification.bind(this))
      .catch(this.error.bind(this));
  }

  protected setUserData(result: any) {
    return this._setUserData.handle(result.user);
  }

  protected sendEmailVerification(user: any) {
    return new Promise((resolve, reject)=>{
      if(user.emailVerified) {
        resolve(user);
        return;
      }
      this._sendEmailVerification.handle()
        .then(this.sendEmailVerificationOk(resolve, reject).bind(this))
        .catch(this.sendEmailVerificationErr(resolve, reject).bind(this));
    });
  }

  protected sendEmailVerificationOk(resolve: any, reject: any) {
    return (response: any) => {
      resolve({response, name: 'emailVerificationHandlers ok'});
    };
  }

  protected sendEmailVerificationErr(resolve: any, reject: any) {
    return (response: any) => {
      reject({response, name: 'emailVerificationHandlers error'});
    };
  }

  protected error(error: any) {
    window.alert(error);
    throw error;
  }
}