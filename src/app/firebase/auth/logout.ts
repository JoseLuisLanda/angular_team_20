import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthSession } from "src/app/services/auth-session";

@Injectable({providedIn: 'root'})
export class Logout {
  constructor(
    protected authSession: AuthSession,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    if(this.authSession.getRemembeMe()) {
      this.authSession.cleanAuthUser();
      return Promise.resolve();
    }

    return this.afAuth.signOut().then((response: any) => {      
      this.authSession.cleanAuthUser();
      return response;
    });
  }
}