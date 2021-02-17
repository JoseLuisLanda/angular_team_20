import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthSession } from "src/app/services/auth-session";

@Injectable({providedIn: 'root'})
export class Logout {
  constructor(
    protected authSession: AuthSession,
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