import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FirebaseApiService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';
  
  constructor() {

  }
}