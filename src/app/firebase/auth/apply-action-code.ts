import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ApplyActionCode {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(code: any) {
    return this.afAuth.applyActionCode(code)
    .then(this.tap.bind(this))
    .catch(this.error.bind(this));
  }

  protected tap(response: any) {
    console.log("response", response);
  }

  protected error(error: any) {
    throw error;
  }
}