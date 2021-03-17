import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId } from 'src/app/shared/models/element';
import { Comunidad, Categoria } from '../../../shared/models/collections';
import { Observable } from 'rxjs';
import { UserModel } from '../../../shared/models/user.model';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profilegrupos',
  templateUrl: './profilegrupos.component.html',
  styleUrls: ['./profilegrupos.component.css'],
})
export class ProfilegruposComponent implements OnInit, OnChanges {
  grupos: Comunidad[] = [];
  currentUser: ElementId = {} as ElementId;
  errormsg = '';
  lenguajes: string[] = [];
  @Input() user: ElementId = {} as ElementId;
  @Input() item: ElementId = {} as ElementId;
  @Input() area: string = '';
  comunidadActiva = '';
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  users: UserModel[] = [];
  lenguajeActivo = '';
  filterName = '';
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('comunidades').subscribe((data) => {
      this.grupos = data;
      if (this.comunidadActiva === '') {
        this.comunidadActiva = this.getMyGrupos()[0]?.id || '';
      }
      const grupoActivo = this.grupos.find(
        (v) => v.id === this.comunidadActiva
      );
      if (!grupoActivo || !this.isMyComunidad(grupoActivo)) {
        this.comunidadActiva = this.getMyGrupos()[0]?.id || '';
      }
      this.getLenguajes();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = this.user;
  }
  getLenguajes(): void {
    const langs: string[] = [];
    for (const grupo of this.grupos) {
      const d = langs.findIndex((v) => v === grupo.lenguaje);
      if (d === -1) {
        langs.push(grupo.lenguaje);
      }
    }
    this.lenguajes = langs;
  }
  ngOnInit(): void {
    this.currentUser = this.user;
    this.getUsers();
    // this.fsService.getCollection('lenguajes', 10).subscribe((v) => {
    //   this.lenguajes = v;
    // });
  }

  addEvent(comunidad: Comunidad): void {
    const isMine = comunidad.users.find((v) => v === this.currentUser.uid);
    if (!isMine) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estas a punto de unirte a la comunidad ' + comunidad.name,
        confirmButtonText: 'Unirme',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      }).then((v) => {
        if (v.isConfirmed) {
          comunidad.users.push(this.currentUser.uid);
          this.fsService.updateDoc('comunidades', comunidad.id, comunidad);
          this.comunidadActiva = comunidad.id;
        }
      });
    }
  }
  isMyComunidad(comunidad: Comunidad, id?: string): boolean {
    const u = id || this.currentUser.uid;
    const isMine = comunidad.users.find((v) => v === u);
    return isMine ? true : false;
  }
  getUser(id: string): UserModel | undefined {
    return this.users.find((v) => v.uid === id);
  }
  DeleteEvent(comunidad: Comunidad) {
    // this.currentUser.grupos?.splice(
    //   this.currentUser.grupos!.findIndex((ev) => ev.uid === comunidad.id),
    //   1
    // );
    // this.addItem.emit(this.currentUser);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estas a punto de abandonar la comunidad ' + comunidad.name,
      confirmButtonText: 'Estoy seguro',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((v) => {
      if (v.isConfirmed) {
        comunidad.users.splice(
          comunidad.users.findIndex((v) => v === this.currentUser.uid),
          1
        );
        this.fsService.updateDoc('comunidades', comunidad.id, comunidad);
      }
    });
  }
  // getUser(id: string): Observable<UserModel> {
  //   return this.fsService.getDoc('users', id).pipe(
  //     tap((v) => {
  //       console.log(v, 'gettingUsers');
  //     })
  //   );
  // }
  EditEvent(event: ElementId) {
    event.url = `comunidades/${event.id}`;
    this.editItem.emit(event);
  }
  getUsers() {
    return this.fsService.getCollection('users', 30).subscribe((v) => {
      this.users = v;
    });
  }
  totalMyGrupos(): number {
    let i = 0;
    for (const grupo of this.grupos) {
      if (this.isMyComunidad(grupo)) {
        i++;
      }
    }
    return i;
  }
  getMyGrupos(): Comunidad[] {
    let i = [];
    for (const grupo of this.grupos) {
      if (this.isMyComunidad(grupo)) {
        i.push(grupo);
      }
    }
    return i;
  }
  filterByName(name: string) {
    if (this.filterName === '') {
      return true;
    }
    if (name.indexOf(this.filterName) !== -1) {
      return true;
    }
    return false;
  }
}
