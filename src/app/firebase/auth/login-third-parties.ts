import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SetUserData } from "./set-user-data";

import firebase from 'firebase/app';
import 'firebase/auth'; 
import { EmailVerification } from "./email-verification";


@Injectable({ providedIn: 'root' })
export class LoginThirdParties {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth,
    protected _emailVerification: EmailVerification,
    protected _setUserData: SetUserData) {}

  facebook() {
    return this.handle(new firebase.auth.FacebookAuthProvider());
  }

  protected handle(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(this.setUserData.bind(this))
      .then(this.emailVerification.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  protected setUserData(result: any) {
    return this._setUserData.handle(result.user);
  }

  protected emailVerification(user: any) {
    
    let emailVerificationHandlers = {
      success(resolve: any, reject: any) {
        return (response: any) => {

        };
      },
      error(resolve: any, reject: any) {
        return (response: any) => {

        };
      }
    }
    
    return new Promise((resolve, reject)=>{
      if(false) {
        this._emailVerification.handle(user)
          .then(emailVerificationHandlers.success(resolve, reject).bind(this))
          .catch(emailVerificationHandlers.error(resolve, reject).bind(this));
      }

      else {
        resolve(user);
      }
    });
  }

  protected errorHandler(error: any) {
    console.log("LoginThirdParties errorHandler", error);
  }
}