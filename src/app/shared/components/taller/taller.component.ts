import { Component, Input, OnInit } from '@angular/core';
import { Taller } from '../../models/collections';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
})
export class TallerComponent implements OnInit {
  @Input() taller!: Taller;
  constructor() {}

  ngOnInit(): void {}
}
