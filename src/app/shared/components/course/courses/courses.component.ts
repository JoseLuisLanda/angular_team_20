import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('talleres').subscribe((data) => {
      this.courses = data;
      //console.log('getting courses: ', data);
    });
  }

  ngOnInit(): void {}
}
