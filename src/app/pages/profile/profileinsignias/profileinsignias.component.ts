import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/services/firebase.service';
import { Insignia } from '../../../shared/models/collections';

@Component({
  selector: 'app-profileinsignias',
  templateUrl: './profileinsignias.component.html',
  styleUrls: ['./profileinsignias.component.css'],
})
export class ProfileinsigniasComponent implements OnInit {
  insignias: Insignia[] = [];
  constructor(private fs: FirestoreService) {}

  ngOnInit(): void {
    this.fs.getCollection('insignias').subscribe((v) => {
      this.insignias = v;
    });
  }
}
