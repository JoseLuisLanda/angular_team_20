import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SetUserData } from "./set-user-data";

import firebase from 'firebase/app';
import 'firebase/auth'; 
import { SendEmailVerification } from "./send-email-verification";


@Injectable({ providedIn: 'root' })
export class LoginThirdParties {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth,
    protected _sendEmailVerification: SendEmailVerification,
    protected _setUserData: SetUserData) {}

  facebook() {
    return this.handle(new firebase.auth.FacebookAuthProvider());
  }

  protected handle(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(this.setUserData.bind(this))
      .then(this.sendEmailVerification.bind(this))
      .then(this.tap.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  protected setUserData(result: any) {
    return this._setUserData.handle(result.user);
  }

  protected sendEmailVerification(user: any) {
    
    let emailVerificationHandlers = {
      success(resolve: any, reject: any) {
        return (response: any) => {
          resolve({response, name: 'emailVerificationHandlers ok'});
        };
      },
      error(resolve: any, reject: any) {
        return (response: any) => {
          reject({response, name: 'emailVerificationHandlers error'});
        };
      }
    }
    
    return new Promise((resolve, reject)=>{
      if(user.emailVerified) {
        resolve(user);
        return;
      }
      this._sendEmailVerification.handle(user)
        .then(emailVerificationHandlers.success(resolve, reject).bind(this))
        .catch(emailVerificationHandlers.error(resolve, reject).bind(this));
    });
  }

  protected tap(user: any) {
    console.log("******datos del usuario para determinar si valido o no el correo:", user);
    return user;
  }

  protected errorHandler(error: any) {
    console.log("LoginThirdParties errorHandler", error);
    throw error;
  }
}