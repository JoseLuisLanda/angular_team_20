import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private url: string = 'urlApi';
  //private apiKey: string = 'apiKey';
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';

  public userToken: string = '';

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
    this.readToken();
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  
  
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
        //console.log('You have been successfully logged in!',result)
        //console.log('email, user!',result.user['email']+" "+result.user['displayName'])
        this.saveToken( result.user['refreshToken']);
        
    }).catch((error: any) => {
        console.log(error)
    })
  }
  private saveToken( idToken: string ): void{
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken);
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
      name: user.name,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( (response: any)  => {
        console.log('entro en el mep()');
        this.saveToken( response['idToken']);
        return response;
      })
    );
    
  }
  login(user: UserModel) {
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
        console.log('entro en el map()');
        this.saveToken( resp['idToken']);
        return resp;
      })
    );
  }


  logOut(): void{
    localStorage.removeItem('token');
    this.userToken = '';
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
