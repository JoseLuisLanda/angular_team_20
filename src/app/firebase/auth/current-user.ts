import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ReplaySubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class CurrentUser {

  public get$: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(protected afAuth: AngularFireAuth) {}

  handle() {
    return this.afAuth.authState;
  }
}