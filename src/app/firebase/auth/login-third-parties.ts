import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SetUserData } from "./set-user-data";

import firebase from 'firebase/app';
import 'firebase/auth'; 


@Injectable({ providedIn: 'root' })
export class LoginThirdParties {
  constructor(
    public ngZone: NgZone,
    public router: Router,
    public afs: AngularFirestore, 
    protected afAuth: AngularFireAuth,
    protected _setUserData: SetUserData) {}

  facebook() {
    return this.handle(new firebase.auth.FacebookAuthProvider());
  }

  protected handle(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(this.setUserData.bind(this))
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  protected setUserData(result: any) {
    return this._setUserData.handle(result.user);
  }

  protected successHandler(result: any) {
    console.log("LoginThirdParties successHandler", result);
  }

  protected errorHandler(error: any) {
    console.log("LoginThirdParties errorHandler", error);
  }
}