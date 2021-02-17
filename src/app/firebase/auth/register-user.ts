import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class RegisterUser {
  constructor(protected afAuth: AngularFireAuth) {}

  handle(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(this.tap.bind(this))
      .catch(this.errorHandler.bind(this));
  }
  protected tap(result: any) {
    return result;
  }

  protected errorHandler(error: any) {
    throw error;
  }
}