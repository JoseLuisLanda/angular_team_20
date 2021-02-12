import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ConfirmPasswordReset {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle(code: any, password: any) {
    return this.afAuth.confirmPasswordReset(code, password)
      .then((response)=>{
        console.log("confirmPasswordReset ok", response);
        return response;
      })
      .catch(err => {
        console.log("neiiiiiiiiii");
      });
  }
}