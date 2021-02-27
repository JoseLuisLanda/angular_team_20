import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/models/element';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:ElementId[] = [];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection("talleres").subscribe(data => {
     
      this.courses = data;
      console.log('getting courses: ', data);
    });
   }

  ngOnInit(): void {
  }

}
