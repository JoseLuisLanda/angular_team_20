import { Component, Input, OnInit } from '@angular/core';
import { FirebaseAuthUser } from 'src/app/firebase/auth/models/firebase-auth-user';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  @Input() authUser: FirebaseAuthUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}
