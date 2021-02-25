import { Component, OnInit } from '@angular/core';
import {TimeService, ActualReloj} from '../../../services/time.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent implements OnInit {

  datos$: Observable<ActualReloj> | undefined;
  dia: number | undefined;
  hora: number | undefined;
  minutos: number | undefined;
  segundos: number | undefined;
  myStorage = window.localStorage;

  constructor(
    private segundo: TimeService,
  ) { }

  ngOnInit(): void {
    this.datos$ = this.segundo.getInfoReloj( new Date("2021-02-28") );
    this.datos$.subscribe(x => {
      this.dia = x.dia;
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.segundos = x.segundo;
    });
  }

}
