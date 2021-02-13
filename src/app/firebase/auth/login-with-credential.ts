import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SetUserData } from "./set-user-data";

@Injectable({providedIn: 'root'})
export class LoginWithCredentials {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth,
    protected _setUserData: SetUserData) {}

  handle(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(this.setUserData.bind(this))
      .catch(this.error.bind(this));
  }

  protected setUserData(result: any) {
    return this._setUserData.handle(result.user);
  }

  protected error(error: any) {
    window.alert(error);
    throw error;
  }
}