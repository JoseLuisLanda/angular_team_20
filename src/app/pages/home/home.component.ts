import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase-admin';
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
  constructor(private auth:AuthService, private fsService: FirestoreService) { 
    fsService.getCollection("users").subscribe(data => {
      this.users = data;
      console.log('getting users: ', data);
    });
    fsService.getCollection("sponsors").subscribe(data => {
      this.users = data;
      console.log('getting sponsors: ', data);
    });
    fsService.getCollection("mentores").subscribe(data => {
      this.users = data;
      console.log('getting mentores: ', data);
    });
    fsService.getCollection("talleres").subscribe(data => {
      this.users = data;
      console.log('getting talleres: ', data);
    });
  }

  ngOnInit(): void {
   
      
  }


}
