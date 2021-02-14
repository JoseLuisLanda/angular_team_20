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
 // Sign in with Google
 
  onSubmit(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    console.log(form);
    Swal.fire('Cargando','Espera por Favor','info');
    Swal.showLoading();
    this.authService.newUser(this.user).subscribe(
      resp => {
        Swal.close();
        if ( this.recordarme ) {
          localStorage.setItem('email', this.user.email);
       }
       this.router.navigateByUrl('/login');
       
          //console.log(resp);
      }, (err) => {
        Swal.fire('Error','No se pudo dar de alta al usuario','error');
          console.log(err);
      });

  }

}
