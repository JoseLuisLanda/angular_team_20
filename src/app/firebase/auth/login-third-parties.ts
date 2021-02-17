import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { SetUserData } from "./set-user-data";

import firebase from 'firebase/app';
import 'firebase/auth'; 
import { AuthSession } from "src/app/services/auth-session";


@Injectable({ providedIn: 'root' })
export class LoginThirdParties {
  constructor(
    protected afAuth: AngularFireAuth,
    protected authSession: AuthSession, 
    protected _setUserData: SetUserData) {}

  facebook() {
    return this.handle(new firebase.auth.FacebookAuthProvider());
  }

  google() {
    return this.handle(new firebase.auth.GoogleAuthProvider());
  }

  protected handle(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(this.setUserData.bind(this))
      .then(this.setUserLocalStorage.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  protected setUserData(result: any) {
    return this._setUserData.handle(result.user);
  }

  protected setUserLocalStorage(user: any) {
    this.authSession.setAuthUser(user);
    return user;
  }

  protected errorHandler(error: any) {
    console.log("LoginThirdParties errorHandler", error);
    throw error;
  }
}