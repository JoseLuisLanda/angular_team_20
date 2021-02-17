import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({providedIn: 'root'})
export class ConfirmPasswordReset {
  constructor(protected afAuth: AngularFireAuth) {}

  handle(code: any, password: any) {
    return this.afAuth.confirmPasswordReset(code, password)
      .then((response)=>{
        return response;
      })
      .catch(err => {
        throw err;
      });
  }
}