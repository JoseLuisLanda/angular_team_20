import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class ApplyActionCode {
  constructor(protected afAuth: AngularFireAuth) {}

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