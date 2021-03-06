import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css'],
})
export class SponsorsComponent implements OnInit {
  sponsors: any[] = [{ uid: 'as', name: 'nombre' }];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('sponsors').subscribe((data) => {
      this.sponsors = data;
      console.log('getting sponsors: ', data);
    });
  }

  ngOnInit(): void {}
}
