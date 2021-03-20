import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { AfsService } from 'src/app/core/services/afs.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FileService } from 'src/app/core/services/file.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ElementId, Item } from 'src/app/shared/models/element';
import { UserModel } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
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
  editProfile = false;
  userModel: UserModel = {} as UserModel;
  selectedTab:string = "default";

  constructor(private auth: AuthService, private afsService : AfsService, 
    private fileSvc: FileService, private profileService: ProfileService) { }
  ngAfterViewInit(): void {
    
    setTimeout( () => {
      console.log("tabselected: "+this.selectedTab);
      if(this.selectedTab !== "default"){
        (<HTMLInputElement> document.getElementById(this.selectedTab)).click();
        Swal.close();
      }
      this.profileService.setSelectedTab("default");
  }, 500);
   
   
  }

  ngOnInit(): void {
    this.selectedTab = this.profileService.getSelectedTab();
    if(this.selectedTab !== "default")
    Swal.showLoading()
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
  editPerfil(element: UserModel){
    this.editProfile = true;
    this.userModel = element;
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
  itemSaved(event: boolean){
    this.editProfile = false;
    this.ngOnInit();
  }
  getUserProfile(userId: string){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   var doc = this.afsService.doc$(`users/${ userId }`).subscribe(res=>{
   this.userProfile = res as ElementId;
  },err=>{console.log("error: "+err);})
  }
}
