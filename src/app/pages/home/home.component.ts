import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase-admin';
import { Observable } from 'rxjs';
import { ElementId } from 'src/app/models/element';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayName:any;
  users: ElementId[] = [];
  user:any;
  constructor(private auth:AuthService, private fsService: FirestoreService) { 
   
    
  }

  ngOnInit(): void {
    this.doConsult(); 
      
  }
  async doConsult() {
     this.user = await this.auth.isAuthenticated();
    if (this.user) {
      
      this.fsService.getCollection("users").subscribe(data => {
        this.users = data;
        console.log('getting users: ', data);
      });
      this.fsService.getCollection("sponsors").subscribe(data => {
        this.users = data;
        console.log('getting sponsors: ', data);
      });
      this.fsService.getCollection("mentores").subscribe(data => {
        this.users = data;
        console.log('getting mentores: ', data);
      });
      this.fsService.getCollection("talleres").subscribe(data => {
        this.users = data;
        console.log('getting talleres: ', data);
      });
    
    } else {
      console.log("No autenticado: ");
   }
 }

}
