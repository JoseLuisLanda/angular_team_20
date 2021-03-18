import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { Insignia } from '../../../shared/models/collections';
import { UserModel } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { AfsService } from 'src/app/core/services/afs.service';
import { ElementId } from 'src/app/shared/models/element';

@Component({
  selector: 'app-profileinsignias',
  templateUrl: './profileinsignias.component.html',
  styleUrls: ['./profileinsignias.component.css'],
})
export class ProfileinsigniasComponent implements OnInit {
  insignias: Insignia[] = [];
  user!: UserModel;
  @Input() onlyIcon = false;
  constructor(private fsService: FirestoreService, private auth: AuthService) {
    this.auth.afAuth.user.subscribe((v: any) => {
      this.user = v;
    });
    this.fsService.getCollection('insignias').subscribe((data) => {
      this.insignias = data;
    });
  }
  isMine(i: Insignia): boolean {
    if (this.user.uid !== null) {
      return i.owners.find((v) => v === this.user.uid) ? true : false;
    } else {
      return false;
    }
  }
  countMyInsignias(): number {
    return this.insignias.filter((v) => this.isMine(v)).length;
  }
  ngOnInit(): void {}
}
