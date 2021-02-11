import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class LoginWithCredentials {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(this.success.bind(this))
      .catch(this.error.bind(this));
  }

  protected success(result: any) {
    this.ngZone.run(() => {
      console.log('result', result);
    })
  }

  protected error(error: any) {
    window.alert(error)
  }
}