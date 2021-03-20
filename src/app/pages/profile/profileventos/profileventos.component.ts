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
import { Insignia } from '../../../shared/models/collections';
import { AuthService } from '../../../core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-profileventos',
  templateUrl: './profileventos.component.html',
  styleUrls: ['./profileventos.component.css'],
})
export class ProfileventosComponent implements OnInit, OnChanges {
  talleres: Taller[] = [];
  currentUser: ElementId = {} as ElementId;
  errormsg = '';
  myTalleres = 0;
  @Input() user: any = {};
  @Input() item: ElementId = {} as ElementId;
  @Input() onlyIcon = false;
  @Input() area = '';
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output()
  uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output()
  removeImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor(
    private fsService: FirestoreService,
    private auth: AuthService,
    private profileService: ProfileService
  ) {
    this.fsService.getCollection('talleres', 10).subscribe((data) => {
      this.talleres = data as any[];
      this.countMyEvents();
    });
    this.auth.afAuth.user.subscribe((v) => {
      if (v) {
        this.user = v;
        this.currentUser = this.user;
        console.log(this.countMyEvents());
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.currentUser = this.user;
    this.countMyEvents();
  }
  countMyEvents(): number {
    const d = this.talleres.filter((v) => this.isMyEvent(v)).length;
    this.myTalleres = d;
    return d;
  }
  ngOnInit(): void {
    this.currentUser = this.user;
  }
  // AddEvent(event: ElementId) {
  //   this.currentUser.talleres = this.currentUser.talleres
  //     ? this.currentUser.talleres
  //     : [];
  //   this.currentUser.url = `users/${this.currentUser.uid}`;

  //   var newEvent: ElementId = {
  //     uid: event.id!,
  //     title: event.title,
  //     description: event.description,
  //     url: `talleres/${event.id}`,
  //   };

  //   const index = this.currentUser.talleres!.findIndex(
  //     (ev) => ev.uid === event.id
  //   );
  //   if (index === -1) {
  //     this.currentUser.talleres?.push(newEvent);
  //     this.addItem.emit(this.currentUser);
  //     this.fsService
  //       .getDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz')
  //       .subscribe((v: Insignia) => {
  //         const f = v.owners.find((id) => id === this.currentUser.uid);
  //         if (!f) {
  //           v.owners.push(this.currentUser.uid);
  //           this.fsService.updateDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz', v);
  //         }
  //       });
  //   } else {
  //     this.errormsg = 'Ya tienes agregado este evento en tu lista.';
  //   }
  // }
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
          console.log(event);
          this.fsService.updateDoc('talleres', event.id, event);
          this.profileService.nuevaActvidad(
            `Te has unido al evento ${event.title}`
          );
          this.fsService
            .getDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz')
            .subscribe((insignia: Insignia) => {
              const f = insignia.owners?.find(
                (id) => id === this.currentUser.uid
              );
              if (!f) {
                if (!insignia.owners) {
                  insignia.owners = [];
                }
                insignia.owners.push(this.currentUser.uid);
                this.fsService.updateDoc(
                  'insignias',
                  'TaOJdHwQdbFBtqYzg2xz',
                  insignia
                );
                this.profileService.nuevaActvidad(
                  `Has obtenido la insignia "Eventual"`
                );
              }
            });
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
            this.profileService.nuevaActvidad(
              `Has abandonado el evento ${event.title}`
            );
          }
        }
      }
    });
  }
  isMyEvent(event: Taller): boolean {
    const f = event.asistentes.find(
      (v) => v.id === this.currentUser.uid && v.status
    );
    return f ? true : false;
  }
  EditEvent(event: ElementId) {
    //agrega un nuevo registro si no tiene un id que editar
    event.url = `talleres/${event.id}`;
    this.editItem.emit(event);
  }
  // newEvent() {
  //   this.newItem.emit("taller");
  // }
  insertImage(event: ElementId) {
    event.url = `talleres/${event.id}`;
    this.uploadImage.emit(event);
  }
  deleteImage(event: ElementId, image: ElementId) {
    //event.url = `comunidades/${event.id}`;
    event.item = image;
    this.removeImage.emit(event);
  }
}
