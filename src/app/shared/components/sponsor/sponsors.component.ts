import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { Sponsor } from '../../models/collections';
@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent implements OnInit {
  images = [
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'},
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'},
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'},
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'},
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'},
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'},
    {path: 'https://assets.entrepreneur.com/images/misc/1464722957_coca_cola_logo.jpg', width:'10%'}
]

  sponsors: Sponsor[] = [];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('sponsors').subscribe((data) => {
      this.sponsors = data;
      console.log(this.sponsors)
    });
  }

  ngOnInit(): void {}
}
