import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class EmailVerification {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(user: any) {
    return this.afAuth.currentUser
    .then(this.sendEmailVerification)
    .catch(this.error.bind(this));
  }

  protected sendEmailVerification(currentUser: any) {
    return currentUser.sendEmailVerification();
  }

  protected error(error: any) {
    window.alert(error)
  }
}