import { Component, Input, OnInit } from '@angular/core';
import { Taller, Categoria } from '../../models/collections';
import { FirestoreService } from '../../../core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
})
export class TallerComponent implements OnInit {
  talleres: Taller[] = [];
  categorias: Categoria[] = [];
  talleresTemp: Taller[] = [];
  currentDate = new Date().getMilliseconds();
  constructor(private fsService: FirestoreService,private router: Router) {}

  ngOnInit(): void {
    this.fsService.getCollection('categorias', 10).subscribe((v) => {
      this.categorias = v;
    });
    this.fsService.getCollection('talleres').subscribe((v: any) => {
      //console.log(v);

      this.talleres = v;
      this.talleresTemp = this.talleres;
    });
  }
  onFilter(categoria: string): void {
    if (categoria === '') {
      this.talleresTemp = this.talleres;
      return;
    }
    this.talleresTemp = this.talleres.filter((v) => v.categoria === categoria);
  }
}
