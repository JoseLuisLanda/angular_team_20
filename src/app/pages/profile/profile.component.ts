import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { AfsService } from 'src/app/core/services/afs.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FileService } from 'src/app/core/services/file.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId, Item } from 'src/app/shared/models/element';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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
  isEditing = false;
  isNewItem = false;
  uploadImage = false;
  singleUpload = false;
  itemTemplate: string  = "perfil";

  constructor(private auth: AuthService, private dbservice: FirestoreService, 
    private fsService: AngularFirestore, private afsService : AfsService, private fileSvc: FileService) { }

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
    //console.log("INSERTANDO: ",JSON.stringify(element))
        this.afsService.set(element.url!,element).then(res =>{
          //console.log("INSERTADO: ",JSON.stringify(res))
        }).catch(error=>{
          console.log("ERROR DE INSERCION: "+JSON.stringify(error));
        });
  }
  removeItem(element: ElementId){
    //console.log("REGISTRO A Eliminar: ",JSON.stringify(element));
       
   }
  editItem(element: ElementId){
    this.templateElement = element;
    this.isNewItem = false;
    this.isEditing = true;
    this.uploadImage = false;
    this.singleUpload = false;
    //this.userProfile = element;
    (<HTMLInputElement> document.getElementById("showModal")).click();
  }
  newItem(element: any){
    //this.itemTemplate = element;
    this.itemTemplate = element;
    this.isNewItem = true;
    this.isEditing = false;
    this.uploadImage = false;
    this.singleUpload = false;
    //this.userProfile = element;
    (<HTMLInputElement> document.getElementById("showModal")).click();
  }
  singleUploadImg(element: ElementId){
    this.singleUpload = true;
    this.userProfile = element;
    this.insertarImagen(element);
  }
  multipleUploadImg(element: any){
    this.singleUpload = false;
    this.insertarImagen(element);
  }
  insertarImagen(element: ElementId){
    this.templateElement = element;
    this.isEditing = false;
    this.uploadImage = true;
    (<HTMLInputElement> document.getElementById("showModal")).click();
  }
  deleteImagen(element: any){
    this.fileSvc.deleteFile(element);
  }

  getUserProfile(userId: string){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   var doc = this.afsService.doc$(`users/${ userId }`).subscribe(res=>{
   this.userProfile = res as ElementId;
  },err=>{console.log("error: "+err);})
  }
}
