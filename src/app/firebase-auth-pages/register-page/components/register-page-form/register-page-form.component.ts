import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-register-page-form',
  templateUrl: './register-page-form.component.html',
  styleUrls: ['./register-page-form.component.css']
})
export class RegisterPageFormComponent implements OnInit {

  @Output() onRegister: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  public passwordMismatch = false;

  constructor(protected fb: FormBuilder) { 
    this.form = this._form();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(200)).subscribe(()=>{
      let form = this.form.getRawValue();
      this.passwordMismatch = (form['password'] !== form['confirmPassword']);
    });
  }

  protected _form() {
    return  this.fb.group({
      email: new FormControl({value:'',disabled:false}, [Validators.required, Validators.email]),
      password: new FormControl({value:'',disabled:false}, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl({value:'',disabled:false}, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    let form = this.form.getRawValue();
    this.onRegister.next(form);
  }

  isShowRestablecerPassword$() {
    let field =  this.form.get('email') as FormControl;
    return field.valueChanges.pipe(map(()=>{
      return {email: field.value, disabled: field.invalid};
    }),debounceTime(200));
  }
}
