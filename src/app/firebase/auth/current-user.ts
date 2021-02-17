import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { take } from "rxjs/operators";
import { SetUserData } from "./set-user-data";

@Injectable({providedIn: 'root'})
export class CurrentUser {

  public get$: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    return this.afAuth.authState;
  }
}