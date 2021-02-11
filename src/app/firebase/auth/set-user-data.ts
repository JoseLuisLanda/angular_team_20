import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class SetUserData {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(user: any) {
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