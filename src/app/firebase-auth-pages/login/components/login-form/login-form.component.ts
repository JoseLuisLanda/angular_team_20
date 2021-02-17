import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AuthSession } from 'src/app/services/auth-session';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  public loginRemenber$: ReplaySubject<any> = new ReplaySubject<any>();
  public onChangeRememberMe$: ReplaySubject<any> = new ReplaySubject<any>();
  public redirectMain$: ReplaySubject<any> = new ReplaySubject<any>();

  public form: FormGroup;
  public emailError: any = true;
  public loginRemember = false;

  constructor(
    protected fb: FormBuilder, 
    private authSession: AuthSession) { 
    this.form = this.getForm();
  }

  ngOnInit(): void {
    this.onChangeEmail();
  }

  ngAfterViewInit(): void {

    this.onChangeRememberMe().subscribe((value)=>{
      this.onChangeRememberMe$.next(value);
    });

    this.loginRemenber$.subscribe((event)=>{
      if(!event.user) return;
      this.form.get('email')?.setValue(event.user.email);
      this.loginRemember = event.remember;
    });

    this.setRemember(this.authSession.getRemembeMe());
  }

  protected setRemember(remember: any) {
    this.form.get('remember')?.setValue(remember);
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
      password: new FormControl({value:'',disabled:false}, [Validators.required, Validators.minLength(6)]),
      remember: new FormControl({value:false,disabled:false}, []),
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

  protected onChangeRememberMe() {
    let field =  this.form.get('remember') as FormControl;
    return field.valueChanges.pipe(map((value)=>{
      return value;
    }));
  }

  redirectMain() {
    this.redirectMain$.next();
  }

}
