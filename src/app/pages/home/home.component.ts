import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { auth } from 'firebase-admin';
import { Observable } from 'rxjs';
import { ElementId } from 'src/app/models/element';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firebase.service';
import { CoursesComponent } from '../section/course/courses/courses.component';
import { SponsorsComponent } from '../section/sponsor/sponsors/sponsors.component';

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
  onActivate(component: SponsorsComponent) {
    /*if (component == "sponsor") {
      console.log("----------------loaded sponsor component-----------------")
      //component.list = this.sponsors;
    } else if (component =="course") {
      console.log("----------------loaded course component-----------------")
      //component.list = this.sponsors;
    }else
    console.log("----------------loaded otro component-----------------", component)*/
    
 }

  ngOnInit(): void {
  
      
  }
  async doConsult() {
  
 }

}
