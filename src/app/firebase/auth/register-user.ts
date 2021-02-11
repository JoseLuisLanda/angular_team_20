import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { EmailVerification } from "./email-verification";

@Injectable({providedIn: 'root'})
export class RegisterUser {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected _emailVerification: EmailVerification,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(this.emailVerification.bind(this))
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  protected emailVerification(user: any) {
    return this._emailVerification.handle(user);
  }

  protected successHandler(result: any) {
    console.log('RegisterUserOk', result);
  }

  protected errorHandler(error: any) {
    console.log('RegisterUserError', error);
  }
}