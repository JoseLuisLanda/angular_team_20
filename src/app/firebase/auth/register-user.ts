import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SendEmailVerification } from "./send-email-verification";

@Injectable({providedIn: 'root'})
export class RegisterUser {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected _sendEmailVerification: SendEmailVerification,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(this.sendEmailVerification.bind(this))
      .then(this.tap.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  protected sendEmailVerification(user: any) {
    return this._sendEmailVerification.handle(user);
  }

  protected tap(result: any) {
    console.log('RegisterUserOk', result);
    return result;
  }

  protected errorHandler(error: any) {
    console.log('RegisterUserError', error);
    throw error;
  }
}