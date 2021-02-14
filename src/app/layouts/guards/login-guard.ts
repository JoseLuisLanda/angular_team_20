import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(
      private auth: AngularFireAuth, 
      private router: Router) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        return this.auth.authState.pipe(map((user)=>{
          console.log("LoginGuard", user);
          let _user = user || {uid: ''};
          let next = _user.uid == '';
          if(!next) this.router.navigate(['main']);
          return next;
        }));
    }
}