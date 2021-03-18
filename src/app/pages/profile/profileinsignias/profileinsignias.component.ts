import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ProfileinsigniasComponent implements OnInit, OnChanges {
  insignias!: Insignia[];
  title:string = "Todas las Insignias";
  user: ElementId = {} as ElementId;
  @Input() child:boolean = false;
  @Input() item:ElementId = {} as ElementId;
  constructor(private fsService: FirestoreService, private auth: AuthService, private afs: AfsService) {
    
   }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.item.uid!==undefined && this.child)
    {
      this.loadInsignias();
      this.title = "Insignias Obtenidas"
    }
    
  }
  isMine(i: Insignia): boolean {
    if(this.item && this.item.uid !== null)
    return i.owners.find((v) => v === this.item.uid) ? true : false;
    else
    return false;
  }
  ngOnInit(): void {
    this.loadInsignias();
  }

  loadInsignias(){
    if(this.child){
      this.fsService.getCollection('insignias',10,"owners",this.item.uid).subscribe((data) => {
        this.insignias = data;
      });
    }else{
      this.fsService.getCollection('insignias').subscribe((data) => {
        this.insignias = data;
       
      });
    }
  }
}
