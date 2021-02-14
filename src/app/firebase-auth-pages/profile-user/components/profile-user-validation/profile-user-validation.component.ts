import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseAuthUser } from 'src/app/firebase/auth/models/firebase-auth-user';

@Component({
  selector: 'app-profile-user-validation',
  templateUrl: './profile-user-validation.component.html',
  styleUrls: ['./profile-user-validation.component.css']
})
export class ProfileUserValidationComponent implements OnInit {

  @Input() authUser: FirebaseAuthUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: ''
  };

  @Output() onSendEmailVerfication: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  verificarEmail() {
    this.onSendEmailVerfication.next();
  }  

}
