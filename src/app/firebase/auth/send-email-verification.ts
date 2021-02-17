import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class SendEmailVerification {
  constructor(protected afAuth: AngularFireAuth) {}

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
    throw error;
  }
}