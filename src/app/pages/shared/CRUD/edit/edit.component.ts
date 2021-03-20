import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupedObservable, of } from 'rxjs';
import { AfsService } from 'src/app/core/services/afs.service';
import { Comunidad, ElementId, Elemento, Item , Taller} from 'src/app/shared/models/element';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges {

  forma: FormGroup = this.fb.group({} as ElementId);
  @Input() isNewElement: boolean = false;
  @Input() item: ElementId = {} as ElementId;
  @Input() newitem: string = "";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  formElement : any;

  constructor(private fb: FormBuilder, private afsService : AfsService) { 
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.crearFormulario();
  }

  ngOnInit(): void {
    
    //this.crearFormulario();
  }
  crearFormulario() {
    console.log("newel: "+JSON.stringify(this.newitem)+"item: "+JSON.stringify(this.item))
    
    if(this.isNewElement)
    {
      const id = this.afsService.createId();
       
       //console.log("isnewElID: "+id)
       switch(this.newitem){
         case "taller":
          this.formElement = new Taller();
          this.formElement.url = `talleres/${id}`;
           break;
          case "comunidad":
            this.formElement = new Comunidad();
            this.formElement.url = `comunidades/${id}`;
           break;
          default:
            this.formElement = {} as Item;
            break;
        
       }
       this.formElement.id = id;
    }
    else{
      console.log("itemTemplate: "+this.newitem)
      this.formElement = this.item;
    }
    
    console.log("form datebirth: "+JSON.stringify(this.formElement.dateBirth))
    this.forma = this.fb.group(this.formElement);
    //ading default fields to form name and description
    this.formElement.name !== undefined ? this.addTextInput('name', this.formElement.name != null ? this.formElement.name : "") : null;
    this.formElement.owner !== undefined ? this.addTextInput('owner', this.formElement.owner != null ? this.formElement.owner : "") : null;
    this.formElement.autor !== undefined ? this.addTextInput('autor', this.formElement.autor != null ? this.formElement.autor : "") : null;
    this.formElement.link !== undefined ? this.addTextInput('link', this.formElement.link != null ? this.formElement.link : "") : null;
    this.formElement.pais !== undefined ? this.addTextInputOp('pais', this.formElement.pais != null ? this.formElement.pais : "") : null;
    this.formElement.genero !== undefined ? this.addTextInputOp('genero', this.formElement.genero != null ? this.formElement.genero : "") : null;
    this.formElement.dateBirth !== undefined ? this.addTextInputOp('dateBirth', this.formElement.dateBirth != null ? this.formElement.dateBirth : "") : null;
    this.formElement.facebook !== undefined ? this.addTextInputOp('facebook', this.formElement.facebook != null ? this.formElement.facebook : "") : null;
    this.formElement.linkedin !== undefined ? this.addTextInputOp('linkedin', this.formElement.linkedin != null ? this.formElement.linkedin : "") : null;
    this.formElement.twitter !== undefined ? this.addTextInputOp('twitter', this.formElement.twitter != null ? this.formElement.twitter : "") : null;
    this.formElement.github !== undefined ? this.addTextInputOp('github', this.formElement.github != null ? this.formElement.github : "") : null;
    this.formElement.description !== undefined ? this.addTextInput('description',
      this.formElement.description != null ? this.formElement.description : "") : null;
   // this.item.status !== undefined ? this.agregarStatus() : null;
   this.formElement.title !== undefined ? this.addTextInput('title', this.formElement.title != null ? this.formElement.title : "") : null;

    this.formElement.displayName != undefined ? this.addTextInput('displayName',
      this.formElement.displayName != null ? this.formElement.displayName : '') : null;
  }
  //ADDING FIELDS
  
  addTextInput(field: string, value: string) {
    this.forma.setControl(field, this.fb.control(value, [Validators.required, Validators.minLength(5)]));
  }
  addTextInputOp(field: string, value: string) {
    this.forma.setControl(field, this.fb.control(value));
  }
  addNumberInput(field: string, value: number) {
    this.forma.setControl(field, this.fb.control(value, [Validators.required, Validators.min(0), Validators.max(1000000000000000)]));
  }
  agregarName() {
    let enabled = this.formElement.name !== '' ? true : false;
    this.forma.setControl('name', this.fb.control({ value: this.formElement.name, disabled: enabled }, [Validators.required, Validators.minLength(6)]));
  }
  formReset() {
    const description = this.formElement.description;
    this.forma.reset();
    this.formElement.elements = [];
    this.formElement.description = '';
  }

  //DELETINGS CONTROLS
  deleteControl(element: string) {
    this.forma.removeControl(element);
  }

  get descriptionNoValido() {
    return this.forma.get('description')!.invalid && this.forma.get('description')!.touched
  }
  get displayNameNoValido() {
    return this.forma.get('displayName')!.invalid && this.forma.get('displayName')!.touched
  }
  get correoNoValido() {
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched
  }
  get nombreNoValido() {
    return this.forma.get('name')!.invalid && this.forma.get('name')!.touched
  }
  get titleNoValido() {
    return this.forma.get('title')!.invalid && this.forma.get('title')!.touched
  }
  get ownerNoValido() {
    return this.forma.get('owner')!.invalid && this.forma.get('owner')!.touched
  }
  get autorNoValido() {
    return this.forma.get('autor')!.invalid && this.forma.get('autor')!.touched
  }
  get linkNoValido() {
    return this.forma.get('link')!.invalid && this.forma.get('link')!.touched
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      console.log( "invalid form" );
      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });

    }
    
    //this.item = this.forma.value;
    if(this.forma.get('email')?.value !== undefined)
       this.formElement.email = this.forma.get('email')?.value;
    if(this.forma.get('displayName')?.value !== undefined)
       this.formElement.displayName = this.forma.get('displayName')?.value;
    if(this.forma.get('description')?.value !== undefined)   
       this.formElement.description = this.forma.get('description')?.value;
    if(this.forma.get('title')?.value !== undefined)  
       this.formElement.title = this.forma.get('title')?.value;
    if(this.forma.get('autor')?.value !== undefined)
       this.formElement.autor = this.forma.get('autor')?.value;
    if(this.forma.get('name')?.value !== undefined)   
       this.formElement.name = this.forma.get('name')?.value;
    if(this.forma.get('owner')?.value !== undefined)  
       this.formElement.owner = this.forma.get('owner')?.value;
    if(this.forma.get('link')?.value !== undefined)  
       this.formElement.link = this.forma.get('link')?.value;
    if(this.forma.get('pais')?.value !== undefined)  
       this.formElement.pais = this.forma.get('pais')?.value;
    if(this.forma.get('genero')?.value !== undefined)
       this.formElement.genero = this.forma.get('genero')?.value;
    if(this.forma.get('linkedin')?.value !== undefined)   
       this.formElement.linkedin = this.forma.get('linkedin')?.value;
    if(this.forma.get('facebook')?.value !== undefined)  
       this.formElement.facebook = this.forma.get('facebook')?.value;
    if(this.forma.get('github')?.value !== undefined)  
       this.formElement.github = this.forma.get('github')?.value;
    if(this.forma.get('twitter')?.value !== undefined)  
       this.formElement.twitter = this.forma.get('twitter')?.value;
    if(this.forma.get('dateBirth')?.value !== undefined)  
       this.formElement.dateBirth = this.forma.get('dateBirth')?.value;

      this.afsService.set(this.formElement.url!,this.formElement).then(res =>{
        console.log("EDITADO: ",JSON.stringify(res))
      }).catch(error=>{
        console.log("ERROR DE EDICION: ");
      }).finally(()=>{(<HTMLInputElement> document.getElementById("dismissModal")).click();});
      

    
  }
}
