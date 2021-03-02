import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { auth } from 'firebase-admin';
import { Observable } from 'rxjs';
import { ElementId } from 'src/app/shared/models/element';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { CoursesComponent } from '../section/course/courses/courses.component';
import { SponsorsComponent } from '../section/sponsor/sponsors/sponsors.component';
import { Comunidad, Taller } from '../../shared/models/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayName: any;
  users: ElementId[] = [];
  user: any;
  comunidades: Comunidad[] = [];
  constructor(private auth: AuthService, private fsService: FirestoreService) {}

  ngOnInit(): void {
    this.fsService.getCollection('comunidades', 5).subscribe((v: any) => {
      this.comunidades = v;
    });
  }
}
