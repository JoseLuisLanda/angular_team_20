import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/firebase/auth/current-user';
import { FirebaseAuthUser } from 'src/app/firebase/auth/models/firebase-auth-user';

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
    private _currentUser: CurrentUser) { }

  ngOnInit(): void {
    this.currentUser();
  }

  protected currentUser() {
    this._currentUser.handle().subscribe(
      this.currentUserOk.bind(this), 
      this.currentUserdErr.bind(this)
    );
  }

  protected currentUserOk(response: any) {
    console.log("currentUserOk", response);
    this.authUser = response;
  }

  protected currentUserdErr(response: any) {
    console.log("currentUserdErr", response);
  }

  verificarEmail() {
    this.router.navigate(['main/send-email-verification']);
  }  

}
