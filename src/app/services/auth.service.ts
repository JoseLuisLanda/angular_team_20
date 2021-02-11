import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'urlApi';
  private apiKey: string = 'apiKey';

  public userToken: string = '';

  constructor(private http: HttpClient) {
    this.readToken();
  }

  private saveToken( idToken: string ): void{
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken);
    let today = new Date();
    today.setSeconds( 3600 );
    localStorage.setItem('expires', today.getTime().toString() )
  }

  private readToken(): string | null {
    if( localStorage.getItem('token')){
      this.userToken = <string>localStorage.getItem('token');
    }
    return this.userToken;
  }

   newUser(user: UserModel){
    const authData = {
      email: user.email,
      password: user.password,
      name: user.name,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( (response: any)  =>{
        this.saveToken( response['idToken']);
        return response;
      })
    );
  }


   login(user: UserModel){
    const authData = {
      email: user.email,
      password: user.password,
      name: user.name,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( (response: any) =>{
        this.saveToken( response['idToken']);
        return response;
      })
    );

  }

  logOut(): void{
    localStorage.removeItem('token');
  }

  isAuthenticated() : boolean{
    if(this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();

    expiresDate.setTime(expires);
    return expiresDate > new Date();
  }


}
