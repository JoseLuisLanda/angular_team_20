import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Observable, Subject, timer} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ActualReloj {
  dia: number | undefined;
  hora: number | undefined;
  minutos: number | undefined;
  segundo: number | undefined;
}

export class TimeService {

  clock: Observable<Date>;
  infofecha$ = new Subject<ActualReloj>();
  ar: ActualReloj | undefined;
  hours: string | undefined;
  minute: string | undefined;
  second: string | undefined;
  day: string | undefined;

  constructor() {
    this.clock = timer(0, 1000)
      .pipe(
        map (t => new Date()),
        shareReplay(1)
      );
  }

  getInfoReloj(fechaLimite: Date): Observable<ActualReloj>{
    this.clock.subscribe(t => {
      this.ar = {
        dia: moment.duration( moment(fechaLimite).diff(new Date())  ).days(),
        hora: moment.duration( moment(fechaLimite).diff(new Date())  ).hours(),
        minutos: moment.duration( moment(fechaLimite).diff(new Date())  ).minutes(),
        segundo: moment.duration( moment(fechaLimite).diff(new Date())  ).seconds()

      };
      this.infofecha$.next(this.ar);
    });
    return this.infofecha$.asObservable();
  }

}
