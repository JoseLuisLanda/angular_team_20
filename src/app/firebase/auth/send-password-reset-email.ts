import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class SendPasswordResetEmail {
  constructor(protected afAuth: AngularFireAuth) {}

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