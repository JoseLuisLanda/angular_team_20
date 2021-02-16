import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe, ReplaySubject } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  public emailError: any = true;

  constructor(protected fb: FormBuilder) { 
    this.form = this.getForm();
  }

  ngOnInit(): void {
    this.onChangeEmail();
  }

  protected onChangeEmail() {
    this.form.get('email')?.valueChanges
      .pipe(debounceTime(100))
      .subscribe(()=>{
        this.emailError = this.form.get('email')?.invalid;
      });
  }

  protected getForm() {
    return  this.fb.group({
      email: new FormControl({value:'',disabled:false}, [Validators.required, Validators.email]),
      password: new FormControl({value:'',disabled:false}, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    let form = this.form.getRawValue();
    this.onLogin.next(form);
  }

  isShowRestablecerPassword$() {
    let field =  this.form.get('email') as FormControl;
    return field.valueChanges.pipe(map(()=>{
      return {email: field.value, disabled: field.invalid};
    }),debounceTime(200));
  }

}
