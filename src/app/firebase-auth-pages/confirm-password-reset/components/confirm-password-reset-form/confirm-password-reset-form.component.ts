import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-confirm-password-reset-form',
  templateUrl: './confirm-password-reset-form.component.html',
  styleUrls: ['./confirm-password-reset-form.component.css']
})
export class ConfirmPasswordResetFormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  public error = false;

  constructor(protected fb: FormBuilder) { 
    this.form = this._form();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(200)).subscribe(()=>{
      let form = this.form.getRawValue();
      this.error = (form['password'] !== form['confirmPassword']) || this.form.invalid;
    });
  }

  protected _form() {
    return  this.fb.group({
      password: new FormControl({value:'',disabled:false}, [Validators.required]),
      confirmPassword: new FormControl({value:'',disabled:false}, [Validators.required])
    });
  }

  submit() {
    let form = this.form.getRawValue();
    if(form['password'] != form['confirmPassword']) {
      this.error = true;
      return;
    }
    this.onSubmit.next(form);
  }

}
