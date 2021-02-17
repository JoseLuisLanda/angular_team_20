import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/firebase/auth/register-user';
import { SwalService } from 'src/app/services/swal-service';
import { RegisterPageFormComponent } from '../register-page-form/register-page-form.component';
import swal from "sweetalert2";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  @ViewChild("registerPageFormComponent") registerPageFormComponent: RegisterPageFormComponent | undefined;

  public isShowRestablecerPassword = {
    email: '',
    disabled: true
  };

  constructor(
    private swalService: SwalService,
    private router: Router,
    private registerUser: RegisterUser) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.registerPageFormComponent?.isShowRestablecerPassword$().subscribe((event)=>{
      //console.log("isShowRestablecerPassword", event);
      this.setIsShowRestablecerPassword(event); 
    });
  }

  protected setIsShowRestablecerPassword(isShowRestablecerPassword: any) {
    this.isShowRestablecerPassword = isShowRestablecerPassword;
  }

  register(form: any) {
    this.registerUser.handle(form.email, form.password)
      .then(this.registerOk.bind(this))
      .catch(this.registerErr.bind(this))
  }

  protected registerOk(response: any) {
    console.log("registerUser ok", response);
    this.login();
  }

  protected registerErr(response: any) {
    if(this.isUserRegister(response.code)) {
      this.swalService.error("Error: "+response.code, JSON.stringify(response));
    }
  }

  protected isUserRegister(code: any) {
    let isUserRegister = 'auth/email-already-in-use';
    return code === isUserRegister;
  }

  cambiarContrasenia() {
    this.router.navigate(['auth/send-password-reset', this.isShowRestablecerPassword.email]);
  }

  login() {
    this.router.navigate(['auth/login']);
  }

}
