import {Component, OnInit} from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import {Leaders, Sponsor} from '../../models/collections';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent implements OnInit {
  images: any = [];
  leaders: Leaders[] = [];
  sponsors: Sponsor[] = [];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('leaders', 15).subscribe( (data) => {
      this.leaders = data;
      console.log('leaders : ' , data);
    });
    this.fsService.getCollection('sponsors', 15).subscribe((data) => {
      this.images = data;
    });
  }

  ngOnInit(): void {}
}