import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class Logout {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    //return Promise.resolve();
    return this.afAuth.signOut().then(() => {
      /*localStorage.removeItem('user');
      this.router.navigate(['sign-in']);*/
      console.log('logout');
    });
  }
}