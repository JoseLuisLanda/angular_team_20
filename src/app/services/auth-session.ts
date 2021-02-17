import { Injectable } from "@angular/core";
import { FirebaseAuthUser } from "../firebase/auth/models/firebase-auth-user";


@Injectable({providedIn: 'root'})
export class AuthSession {

  private static AUTH_USER = "AUTH_USER";

  constructor() {

  }

  setAuthUser(user: FirebaseAuthUser) {
    localStorage.setItem(AuthSession.AUTH_USER, JSON.stringify(user));
  }

  getAuthUser() {
    let encode:any = localStorage.getItem(AuthSession.AUTH_USER);
    let decode = JSON.parse(encode);
    return decode;
  }
}