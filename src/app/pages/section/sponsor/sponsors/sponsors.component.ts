import {Component, OnInit, EventEmitter, Input, Output, AfterViewInit} from '@angular/core';
import { ElementId } from 'src/app/models/element';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firebase.service';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, AfterViewInit {
  sponsors: ElementId[] = [{uid: 'as', name: 'nombre'}];
  mySwiper: Swiper | undefined;
  constructor( private fsService: FirestoreService ) {
    this.fsService.getCollection('sponsors').subscribe(data => {
      this.sponsors = data;
      console.log('getting sponsors: ', data);
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    SwiperCore.use([Navigation, Pagination, Scrollbar]);
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      centeredSlides: false,
      spaceBetween: 0,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
