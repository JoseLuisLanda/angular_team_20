import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { SendVerification } from "./send-verification";

@Injectable({providedIn: 'root'})
export class RegisterUser {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected sendVerification: SendVerification,
    public afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(
        this.sendVerification.handle.bind(this.sendVerification),
        this.success.bind(this),
      )
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