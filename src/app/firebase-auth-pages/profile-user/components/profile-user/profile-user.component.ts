import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseAuthUser } from 'src/app/firebase/auth/models/firebase-auth-user';
import { SetUserData } from 'src/app/firebase/auth/set-user-data';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  public authUser: FirebaseAuthUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: ''
  };

  constructor(
    private router: Router,
    private setUserData: SetUserData,
    private _firebaseAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.currentUser();
  }

  protected currentUser() {
    this._firebaseAuth.authState.subscribe(
      this.currentUserOk.bind(this), 
      this.currentUserdErr.bind(this)
    );
  }

  protected currentUserOk(response: any) {
    this.setUserData.handle(response)
      .then(this.setUserDataOk.bind(this))
      .catch(this.setUserDataErr.bind(this));
  }

  protected currentUserdErr(response: any) {
    console.log("currentUserdErr", response);
  }

  protected setUserDataOk(response: any) {
    console.log("setUserDataOk", response);
    this.authUser = response;
  }

  protected setUserDataErr(response: any) {
    console.log("setUserDataErr", response);
  }

  verificarEmail() {
    this.router.navigate(['main/send-email-verification']);
  }  

}
