import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthButtonActionEvent } from './auth-button-action.event';

@Component({
  selector: 'app-auth-button-action',
  templateUrl: './auth-button-action.component.html',
  styleUrls: ['./auth-button-action.component.css']
})
export class AuthButtonActionComponent implements OnInit {

  public shows: any;

  constructor(
    private router: Router,
    private authButtonActionEvent: AuthButtonActionEvent) { 
    this.shows = this._shows();
  }

  ngOnInit(): void {
    this.authButtonActionEvent.event$.subscribe(this.updateHiddens.bind(this));
  }

  protected updateHiddens(shows: any) {
    this.shows['login'] = shows['login']; 
    this.shows['register'] = shows['register']; 
  }

  protected _shows() {
    return {
      login: false,
      register: true,
    };
  }

  login() {
    this.router.navigate(['auth/login']);
  }

  register() {
    this.router.navigate(['auth/register']);
  }

}
