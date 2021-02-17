import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class SendPasswordResetEmail {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(email: any) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}