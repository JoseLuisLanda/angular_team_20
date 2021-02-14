import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class RegisterUser {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(this.tap.bind(this))
      .catch(this.errorHandler.bind(this));
  }
  protected tap(result: any) {
    console.log('RegisterUserOk', result);
    return result;
  }

  protected errorHandler(error: any) {
    console.log('RegisterUserError', error);
    throw error;
  }
}