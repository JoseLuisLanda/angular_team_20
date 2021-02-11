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
    protected setUserData: SetUserData) {}

  facebook() {
    return this.handle(new firebase.auth.FacebookAuthProvider());
  }

  protected handle(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(this.success.bind(this))
      .catch(this.error.bind(this));
  }

  protected success(result: any) {
    this.setUserData.handle(result.user);
  }

  protected error(error: any) {
    window.alert(error)
  }
}