import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthButtonActionEvent {
  public event$: ReplaySubject<any> = new ReplaySubject<any>();
  constructor(private router: Router) {

  }

  login() {
    this.router.navigate(['auth/login']);
  }

  register() {
    this.router.navigate(['auth/register']);
  }
}