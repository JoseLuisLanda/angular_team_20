import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AfsService } from 'src/app/core/services/afs.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId } from 'src/app/shared/models/element';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user:any;
  userProfile:ElementId = {} as ElementId;
  @Input() type: string = "";
  @Input() item: ElementId = {} as ElementId;
  @Input() area: string = "";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  title = 'ComfecoApp';
  templateElement = {} as ElementId;
  caller = 'defaultArea';
  modalCaller = 'ejemplo';
  
  constructor(private auth: AuthService, private dbservice: FirestoreService, 
    private fsService: AngularFirestore, private afsService : AfsService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  async loadUser() {
    this.user = await this.auth.isAuthenticated();
    if(this.user?.uid){
      this.getUserProfile(this.user?.uid)
    }
  }

  insertItem(element: ElementId){
        this.afsService.set(element.url!,element).then(res =>{
          //console.log("INSERTADO: ",JSON.stringify(res))
        }).catch(error=>{
          //console.log("ERROR DE INSERCION: ");
        });
  }
  removeItem(element: ElementId){
    console.log("REGISTRO A Eliminar: ",JSON.stringify(element));
       
   }
  editItem(element: ElementId){
    this.templateElement = element;
    (<HTMLInputElement> document.getElementById("showModal")).click();
  }


  getUserProfile(userId: string){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   var doc = this.afsService.doc$(`users/${ userId }`).subscribe(res=>{
   this.userProfile = res as ElementId;
  },err=>{console.log("error: "+err);})
  }
}
