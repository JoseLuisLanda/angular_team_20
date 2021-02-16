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
    private setUserData: SetUserData,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    this.afAuth.authState.subscribe(
      this.currentUserOk.bind(this), 
      this.currentUserdErr.bind(this)
    );

    return this.get$.asObservable().pipe(take(1));
  }

  protected currentUserOk(response: any) {
    this.setUserData.handle(response)
      .then(this.setUserDataOk.bind(this))
      .catch(this.setUserDataErr.bind(this));
  }

  protected currentUserdErr(response: any) {
    console.log("currentUserdErr", response);
    throw response;
  }

  protected setUserDataOk(response: any) {
    console.log("setUserDataOk", response);
    this.get$.next(response);
    return response; 
  }

  protected setUserDataErr(response: any) {
    console.log("setUserDataErr", response);
    throw response;
  }
}