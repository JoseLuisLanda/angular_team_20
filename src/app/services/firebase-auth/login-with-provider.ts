import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class LoginWithProvider {
  constructor(public afAuth: AngularFireAuth) {}

  handle(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(this.success.bind(this))
      .catch(this.error.bind(this));
  }

  success(response: any) {
    return response;
  }

  error(response: any) {
    throw response;
  }

  
}