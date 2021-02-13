import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page-form',
  templateUrl: './register-page-form.component.html',
  styleUrls: ['./register-page-form.component.css']
})
export class RegisterPageFormComponent implements OnInit {

  @Output() onRegister: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  constructor(protected fb: FormBuilder) { 
    this.form = this._form();
  }

  ngOnInit(): void {

  }

  protected _form() {
    return  this.fb.group({
      email: new FormControl({value:'',disabled:false}, [Validators.required, Validators.email]),
      password: new FormControl({value:'',disabled:false}, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    let form = this.form.getRawValue();
    this.onRegister.next(form);
  }
}
