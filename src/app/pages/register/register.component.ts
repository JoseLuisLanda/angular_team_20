import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register1.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: UserModel = {} as UserModel;
  recordarme = false;
  ruta = 'users';
  passwordConfirm = '';

  constructor(
    private authLogin: AuthService,
    private db: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      return;
    }
    try {
      if (this.user.password !== this.passwordConfirm) {
        return;
      }
      const user = await this.authLogin.newUser(this.user);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: UserModel): void {
    if (!user.emailVerified) {
      this.router.navigate(['/verification']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  loginFace(): void {
    this.authLogin
      .FacebookAuth()
      .then((val) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.router.navigateByUrl('/register');
      });
  }

  loginGmail(): void {
    this.authLogin
      .GoogleAuth()
      .then((val) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.router.navigateByUrl('/register');
      });
  }
}
