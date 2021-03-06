import { Component, OnInit, Input } from '@angular/core';
import { Comunidad } from '../../models/collections';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css'],
})
export class ComunidadComponent implements OnInit {
  @Input() comunidad!: Comunidad;
  defaultImage =
    'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png';
  constructor() {}

  ngOnInit(): void {}
}
