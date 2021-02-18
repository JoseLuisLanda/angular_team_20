import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-register',
  templateUrl: './register1.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel = {} as UserModel;
  recordarme = false;
  ruta = "users";
  constructor(private authService: AuthService,
    private db: AngularFirestore,
    private _firestoreService: FirestoreService,
    private router: Router) { }

  ngOnInit(): void {
  }
 
  async onSubmit(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    try {
      const user = await this.authService.newUser(this.user);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: UserModel) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/verification']);
    } else {
      this.router.navigate(['/register']);
    }
  }

}
