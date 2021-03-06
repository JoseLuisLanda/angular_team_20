import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { map, switchMap } from 'rxjs/operators';
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
  public user$: Observable<any>;
  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private db: AngularFirestore) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user:any) => {
        if (user) {
          return this.db.doc<UserModel>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    this.readToken();
    console.log(this.user$)
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
        //this.saveToken( result.user['refreshToken'], userData);
        
    }).catch((error: any) => {
        console.log(error)
    })
  }
  private saveToken( idToken: string, userData: any ): void{
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken);
    localStorage.setItem( 'displayName', userData["displayName"]);
    localStorage.setItem( 'email', userData["email"]);
    let today = new Date();
    today.setSeconds( 3600 );
    localStorage.setItem('expires', today.getTime().toString() )
  }

  private readToken(): string | null {
    if( localStorage.getItem('token')){
      this.userToken = <string>localStorage.getItem('token');
    }
    return this.userToken;
  }
  async login(userData: UserModel): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async newUser(userData: UserModel): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
   newUser1(user: UserModel){
    const authData = {
      email: user.email,
      password: user.password,
      displayName: user.name,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( (response: any)  => {
        console.log('entro en el map()');
        this.sendVerificationEmail().then((value:any)=>{
          console.log("Email sent!" + value);
        }).catch((error: any)=>{
          console.log("Email failed!" + error);
        });
        //this.saveToken( response['idToken'], response);
        this.insertUserBD(user);
        return response;
      })
    );
    
  }
  insertUserBD(user: UserModel){
    this.db.collection("users",ref => ref.where('email', '==', user.email)).doc(user.email).set({
      email:user.email,
      displayName:user.displayName != undefined ? user.displayName : user.name,
      organization: user.email!.split("@")[1]
    })
    .then(() => {
      console.log("Document successfully updated!");
      //this.router.navigateByUrl('/home');
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      //this.router.navigateByUrl('/login');
    });
  }
  loginNormal(user: UserModel) {
    this.logOut();
    const authData = {
      email : user.email,
      password : user.password,
      name: user.name,
      returnSecureToken : true
    };
    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( (resp: any)  => {
        console.log('entro en el map() ',resp);
        this.saveToken( resp['idToken'], resp);
        return resp;
      })
    );
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
  getUserName(){
    return localStorage.getItem('displayName') != "" ? localStorage.getItem('displayName'):"empty"
  }
  isAuthenticated() : boolean{
    if(this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();

    expiresDate.setTime(expires);
    return expiresDate > new Date();
  }
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<UserModel> = this.db.doc(
      `users/${user.uid}`
    );

    const data: UserModel = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'ADMIN',
    };

    return userRef.set(data, { merge: true });
  }

}
