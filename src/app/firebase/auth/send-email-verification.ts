import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class SendEmailVerification {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    return this.afAuth.currentUser
    .then(this.sendEmailVerification.bind(this))
    .catch(this.error.bind(this));
  }

  protected sendEmailVerification(currentUser: any) {
    if(currentUser.emailVerified) {
      return Promise.resolve(currentUser);
    }
    
    return currentUser.sendEmailVerification()
      .then(this.sendEmailVerificationOk.bind(this))
      .catch(this.sendEmailVerificationError.bind(this));
  }

  protected sendEmailVerificationOk(response: any) {
    return response;
  }

  protected sendEmailVerificationError(response: any) {
    throw response;
  }

  protected error(error: any) {
    window.alert(error);
    throw error;
  }
}