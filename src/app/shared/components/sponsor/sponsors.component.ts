import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { Sponsor } from '../../models/collections';
@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent implements OnInit {
  images: any = [];

  sponsors: Sponsor[] = [];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('sponsors').subscribe((data) => {
      this.images = data;
    });
  }

  ngOnInit(): void {}
}
