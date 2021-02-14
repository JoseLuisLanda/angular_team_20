import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private auth: AngularFireAuth, 
      private router: Router) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        return this.auth.authState.pipe(map((user)=>{
          console.log("AuthGuard", user);
          return true;
        }));
    }
}