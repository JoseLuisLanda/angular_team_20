import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPasswordRecovery: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  constructor(protected fb: FormBuilder) { 
    this.form = this.getForm();
  }

  ngOnInit(): void {

  }

  protected getForm() {
    return  this.fb.group({
      email: new FormControl({value:'',disabled:false}, [Validators.required, Validators.email]),
      password: new FormControl({value:'',disabled:false}, [Validators.required])
    });
  }

  submit() {
    let form = this.form.getRawValue();
    this.onLogin.next(form);
  }

  restablecerPassword() {
    if(this.form.get('email')?.invalid) return;
    this.onPasswordRecovery.next(this.form.getRawValue());
  }

}
