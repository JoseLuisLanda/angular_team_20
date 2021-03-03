import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { first, map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ElementId } from '../models/element';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { RoleValidator } from '../helpers/roleValidator';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator {
  //private url: string = 'urlApi';
  //private apiKey: string = 'apiKey';
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';

  public userToken: string = '';
  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private db: AngularFirestore) {
    super();
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  
  FacebookAuth(){
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());

  }
  async sendVerificationEmail(): Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }
  recoveryPassword(emailAddress:string){

    return this.afAuth.sendPasswordResetEmail(emailAddress);
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    this.logOut();
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
        console.log('You have been successfully logged in!',result);
        console.log('email, user!',result.user['email']+" "+result.user['displayName'])
        this.updateUserData(result.user);
    }).catch((error: any) => {
        console.log(error)
    })
  }

  async login(userData: UserModel): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      if(user){
        this.updateUserData(user);
      }
      console.log("recordarme: "+userData.rememberme);
      if(userData.rememberme)
        this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        else
        this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async newUser(userData: UserModel): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      await this.sendVerificationEmail();
      const usernew = await this.isAuthenticated();
        if(usernew && user){
        usernew.updateProfile({displayName: userData.displayName});
        userData.uid = user.uid;
        userData.emailVerified = user.emailVerified;
        userData.refreshToken = user.refreshToken;
        this.updateUserData(userData);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }


  logOut(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('displayName');
    localStorage.removeItem('email');
    this.userToken = '';
    return true;
  }
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  
  isAuthenticated() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<UserModel> = this.db.doc(
      `users/${user.uid}`
    );
    //console.log("user saving :"+JSON.stringify(user));
    const data: UserModel = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL ? user.photoURL : "assets/photo",
      refreshToken: user.refreshToken ? user.refreshToken : "",
      organization: user.email!.split("@")[1]
    };

    return userRef.set(data, { merge: true });
  }

}
