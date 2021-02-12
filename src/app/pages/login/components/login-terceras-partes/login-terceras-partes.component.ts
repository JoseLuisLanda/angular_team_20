import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-terceras-partes',
  templateUrl: './login-terceras-partes.component.html',
  styleUrls: ['./login-terceras-partes.component.css']
})
export class LoginTercerasPartesComponent implements OnInit {

  @Output() onLoginFacebook: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  loginFacebook() {
    this.onLoginFacebook.next();
  }

}
