import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthButtonActionEvent {
  public event$: ReplaySubject<any> = new ReplaySubject<any>();
  constructor() {

  }
}