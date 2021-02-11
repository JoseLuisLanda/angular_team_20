import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class SendVerification {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    this.afAuth.currentUser
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