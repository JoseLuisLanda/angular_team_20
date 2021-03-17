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
import { Taller } from 'src/app/shared/models/collections';
import { ElementId } from 'src/app/shared/models/element';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profileventos',
  templateUrl: './profileventos.component.html',
  styleUrls: ['./profileventos.component.css'],
})
export class ProfileventosComponent implements OnInit, OnChanges {
  talleres: Taller[] = [];
  currentUser: ElementId = {} as ElementId;
  errormsg = '';
  @Input() user: ElementId = {} as ElementId;
  @Input() item: ElementId = {} as ElementId;
  @Input() area = '';
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('talleres').subscribe((data) => {
      this.talleres = data;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = this.user;
  }
  ngOnInit(): void {
    this.currentUser = this.user;
  }
  isMyEvent(event: Taller): boolean {
    const f = event.asistentes.find(
      (v) => v.id === this.currentUser.uid && v.status
    );
    return f ? true : false;
  }
  canIAsist(event: Taller): boolean {
    if (this.isMyEvent(event)) {
      return false;
    }
    const f = event.asistentes.find((v) => v.id === this.currentUser.uid);
    if (!f) {
      return true;
    }
    if (!f.status) {
      return false;
    }
    return true;
  }
  AddEvent(event: Taller) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estas a punto de apuntarte para el evento ' + event.title,
      confirmButtonText: 'Asistiré',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((v) => {
      if (v.isConfirmed) {
        if (!Array.isArray(event.asistentes)) {
          event.asistentes = [];
        }
        if (!this.isMyEvent(event)) {
          event.asistentes.push({ id: this.currentUser.uid, status: true });
          this.fsService.updateDoc('talleres', event.id, event);
        }
      }
    });
    // this.currentUser.talleres = this.currentUser.talleres
    //   ? this.currentUser.talleres
    //   : [];
    // this.currentUser.url = `users/${this.currentUser.uid}`;

    // const newEvent: Taller = {
    //   uid: event.id!,
    //   title: event.title,
    //   description: event.description,
    //   url: `talleres/${event.id}`,
    // };

    // const index = this.currentUser.talleres!.findIndex(
    //   (ev) => ev.uid === event.id
    // );
    // if (index === -1) {
    //   this.currentUser.talleres?.push(newEvent);
    //   this.addItem.emit(this.currentUser);
    //   this.fsService
    //     .getDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz')
    //     .subscribe((v: Insignia) => {
    //       const f = v.owners.find((id) => id === this.currentUser.uid);
    //       if (!f) {
    //         v.owners.push(this.currentUser.uid);
    //         this.fsService.updateDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz', v);
    //       }
    //     });
    // } else {
    //   this.errormsg = 'Ya tienes agregado este evento en tu lista.';
    // }
  }
  DeleteEvent(event: Taller) {
    Swal.fire({
      title: '¿Estás seguro?',
      text:
        'Estas a punto de retirarte del evento ' +
        event.title +
        ' y si lo haces no podrás volver a unirte',
      confirmButtonText: 'Estoy seguro',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((v) => {
      if (v.isConfirmed) {
        // this.currentUser.talleres?.splice(
        //   this.currentUser.talleres!.findIndex((ev) => ev.id === event.id),
        //   1
        // );
        // this.addItem.emit(this.currentUser);
        if (this.isMyEvent(event)) {
          const index = event.asistentes.findIndex(
            (d) => d.id === this.currentUser.uid
          );
          if (index !== -1) {
            event.asistentes[index].status = false;
            this.fsService.updateDoc('talleres', event.id, event);
          }
        }
      }
    });
  }
  EditEvent(event: Taller) {
    // event.url = `talleres/${event.id}`;
    // this.editItem.emit(event);
  }
}
