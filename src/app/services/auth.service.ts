import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ElementId } from '../models/element';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private url: string = 'urlApi';
  //private apiKey: string = 'apiKey';
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';

  public userToken: string = '';

  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private db: AngularFirestore,) {
    this.readToken();
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  
  FacebookAuth(){
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());

  }
  recoveryPassword(emailAddress:string){

    return this.afAuth.sendPasswordResetEmail(emailAddress);/*.then(function() {
      // Email sent.
      console.log('Email sent!');
    }).catch(function(error) {
      // An error happened.
      console.log('Email error!',error);
    });*/
  }
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    this.logOut();
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
        console.log('You have been successfully logged in!',result);
         /* @type {firebase.auth.OAuthCredential} 
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;*/

        console.log('email, user!',result.user['email']+" "+result.user['displayName'])
        const userData: UserModel = {
            email : result.user['email'],
            displayName: result.user['displayName'] == "" && result.user['displayName'] == undefined ? 
            result.user['email'].split("@")[0]:result.user['displayName'],
            organization: result.user['email'].split("@")[1]
        };
        this.insertUserBD(userData);
        this.saveToken( result.user['refreshToken'], userData);
        
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

   newUser(user: UserModel){
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
  login(user: UserModel) {
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


}
