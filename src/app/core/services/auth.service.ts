import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../shared/models/user.model';
import { first, map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { RoleValidator } from '../../shared/helpers/roleValidator';
import { AfsService } from './afs.service';
import { ElementId } from 'src/app/shared/models/element';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends RoleValidator {
  //private url: string = 'urlApi';
  //private apiKey: string = 'apiKey';
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';
  credentialEmail : any;
  public userToken: string = '';
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private afsService : AfsService
  ) {
    super();
    this.afAuth.credential.subscribe(v => {
      console.log('Credential', v);
    });
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }
  recoveryPassword(emailAddress: string) {
    return this.afAuth.sendPasswordResetEmail(emailAddress);
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    this.logOut();
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
      this.getUserProfile(result.user['uid'], result)
    
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  getUserProfile(userId: string, result: any){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   var doc = this.afsService.doc$(`users/${ userId }`).subscribe(res=>{
     var resp:ElementId = res as ElementId;
    if(resp === undefined){
     // console.log("updating register")
      this.updateUserData(result.user);
    }
  },err=>{console.log("error: "+err);})
  }
  async login(userData: UserModel): Promise<any> {
    try {
      const d = await this.afAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      this.credentialEmail = d.credential;

      if (userData.rememberme)
        this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      else this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      return d.user;
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
      if (usernew && user) {
        usernew.updateProfile({ displayName: userData.displayName });
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

  logOut(): boolean {
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

    const data: UserModel = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL ? user.photoURL : 'assets/photo',
      refreshToken: user.refreshToken ? user.refreshToken : '',
      organization: user.email!.split('@')[1],
      type: user.email!.split('@')[1] === "gmail.com" ? "user":"admin",
      url:`users/${user.uid}`
    };

    return userRef.set(data, { merge: true });
  }
}
