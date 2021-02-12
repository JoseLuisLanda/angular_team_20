import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-button-action',
  templateUrl: './auth-button-action.component.html',
  styleUrls: ['./auth-button-action.component.css']
})
export class AuthButtonActionComponent implements OnInit {

  public hiddens: any;

  constructor() { 
    this.hiddens = this._hiddens();
  }

  ngOnInit(): void {
  }

  protected _hiddens() {
    return {
      login: true,
      register: true,
    };
  }

}
