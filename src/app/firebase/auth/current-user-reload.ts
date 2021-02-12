import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import 'firebase/auth'; 

@Injectable({providedIn: 'root'})
export class CurrentUserReload {
  constructor(
    protected ngZone: NgZone,
    protected router: Router,
    protected afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    return firebase.auth().currentUser?.reload().then(() => {
      return firebase.auth().currentUser;
    });
  }
}