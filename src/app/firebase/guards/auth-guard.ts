import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthSession } from "src/app/services/auth-session";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
      private authSession: AuthSession,
      private auth: AngularFireAuth, 
      private router: Router) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        return this.auth.authState.pipe(map((user)=>{
          console.log("AuthGuard", user);
          let _user = user || {uid: ''};
          let authState = _user.uid != '';
          if(!authState || !this.authSession.getAuthUser()) {
            this.router.navigate(['auth/login']);
            return false;
          }

          return true;
        }));
    }
}