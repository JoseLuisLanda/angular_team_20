import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class LoginFacebook {
  constructor(
    public ngZone: NgZone,
    public router: Router,
    public afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {
  }

  handle() {
    return this.afAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider)
      .then((result) => {
        this.ngZone.run(() => {
          console.log('result', result);
        })
        //this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  protected setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}