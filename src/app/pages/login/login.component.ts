import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',   //templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = {} as UserModel;
  recordarme = false;

  constructor(private authLogin: AuthService,
    private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }
  loginGmail(){

    this.authLogin.GoogleAuth().then(val=>{
      this.router.navigateByUrl('/home');
    }).catch(error =>{
      this.router.navigateByUrl('/register');
    })
  }
  login(form: NgForm) {
    if ( !form.valid ) {
     return;
    }
    Swal.fire('Autenticando','Espera por Favor','info');
    Swal.showLoading();
    this.authLogin.login( this.user ).subscribe(
     resp => {
       Swal.close();
       this.router.navigateByUrl('/home');

       if ( this.recordarme ) {
          localStorage.setItem('email', this.user.email);
       }
     }, (err) => {
        Swal.fire('Error','No se pudo autenticar al usuario, intenta mas tarde','error');
        console.log(err.error.error.message);
     }
    );
    console.log(form);
  }
}
