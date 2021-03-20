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
import Swal from 'sweetalert2';
import { Comunidad } from '../../../shared/models/collections';
import { UserModel } from '../../../shared/models/user.model';

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
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output()
  uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output()
  removeImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() newItem: EventEmitter<string> = new EventEmitter<string>();
  filterName = '';
  lenguajeActivo = '';
  comunidadActiva = '';
  users: UserModel[] = [];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('comunidades').subscribe((data: any) => {
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
  totalMyGrupos(): number {
    let i = 0;
    for (const grupo of this.grupos) {
      if (this.isMyComunidad(grupo)) {
        i++;
      }
    }
    return i;
  }
  ngOnInit(): void {
    this.currentUser = this.user;
    this.getUsers();
  }
  getLenguajes(): void {
    const langs: string[] = [];
    for (const grupo of this.grupos) {
      const d = langs.findIndex((v) => v === grupo.lenguaje);
      if (d === -1) {
        langs.push(grupo.lenguaje!);
      }
    }
    this.lenguajes = langs;
  }
  isMyComunidad(comunidad: Comunidad, id?: string): boolean {
    const u = id || this.currentUser.uid;
    const isMine = comunidad.users!.find((v) => v === u);
    return isMine ? true : false;
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
  // AddEvent(event: ElementId) {
  //   this.currentUser.grupos = this.currentUser.grupos
  //     ? this.currentUser.grupos
  //     : [];
  //   this.currentUser.url = `users/${this.currentUser.uid}`;

  //   const newEvent: ElementId = {
  //     uid: event.id!,
  //     title: event.title,
  //     description: event.description,
  //     url: `comunidades/${event.id}`,
  //   };

  //   const index = this.currentUser.grupos!.findIndex(
  //     (ev) => ev.uid === event.id
  //   );
  //   if (index === -1) {
  //     this.currentUser.grupos?.push(newEvent);
  //     this.addItem.emit(this.currentUser);
  //   } else {
  //     this.errormsg = 'Ya tienes agregado este evento en tu lista.';
  //   }
  // }
  addEvent(comunidad: Comunidad): void {
    const isMine = comunidad.users!.find((v) => v === this.currentUser.uid);
    if (!isMine) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estas a punto de unirte a la comunidad ' + comunidad.name,
        confirmButtonText: 'Unirme',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      }).then((v) => {
        if (v.isConfirmed) {
          comunidad.users!.push(this.currentUser.uid);
          this.fsService.updateDoc('comunidades', comunidad.id!, comunidad);
          this.comunidadActiva = comunidad.id!;
        }
      });
    }
  }
  DeleteEvent(comunidad: Comunidad) {
    // this.currentUser.grupos?.splice(
    //   this.currentUser.grupos!.findIndex((ev) => ev.uid === event.id),
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
        comunidad.users!.splice(
          comunidad.users!.findIndex((d) => d === this.currentUser.uid),
          1
        );
        this.fsService.updateDoc('comunidades', comunidad.id!, comunidad);
      }
    });
  }
  EditEvent(event: ElementId) {
    var grupo:ElementId = {...event}; 
    grupo.url = `comunidades/${event.id}`;
    console.log("grupo: "+JSON.stringify(grupo))
    this.editItem.emit(grupo);
  }
  newEvent() {
    this.newItem.emit('comunidad');
  }
  getUsers() {
    return this.fsService.getCollection('users', 30).subscribe((v) => {
      this.users = v;
    });
  }
  getUser(id: string): UserModel | undefined {
    return this.users.find((v) => v.uid === id);
  }
  insertImage(event: ElementId) {
    event.url = `comunidades/${event.id}`;
    this.uploadImage.emit(event);
  }
  deleteImage(event: ElementId, image: ElementId) {
    //event.url = `comunidades/${event.id}`;
    //console.log("antes de eliminar:"+JSON.stringify(image))
    event.item = image;
    console.log("antes de eliminar:"+JSON.stringify(event))
    event.images?.splice(event.images?.indexOf(event.item!),1)
    console.log("despues de eliminar:"+JSON.stringify(event))
    this.removeImage.emit(event);
  }
  filterByName(name: string) {
    if (this.filterName.trim() === '') {
      return true;
    }
    if (name.indexOf(this.filterName) !== -1) {
      return true;
    }
    return false;
  }

  
}
