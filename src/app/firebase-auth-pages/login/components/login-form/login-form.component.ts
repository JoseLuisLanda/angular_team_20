import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { CurrentUser } from 'src/app/firebase/auth/current-user';
import { AuthSession } from 'src/app/services/auth-session';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  public loginRemenber$: ReplaySubject<any> = new ReplaySubject<any>();
  public redirectMain$: ReplaySubject<any> = new ReplaySubject<any>();

  public form: FormGroup;
  public emailError: any = true;
  public loginRemember = false; 
  public userRememberMe: any = {user: null, rememberMe: null};

  constructor(
    private currentUser: CurrentUser,
    protected fb: FormBuilder, 
    private authSession: AuthSession) { 
    this.form = this.getForm();
  }

  ngOnInit(): void {
    this.onChangeEmail();
    this.onChangeRememberMe().subscribe((data)=>{
      this.userRememberMe = data;
      this.form.get('email')?.setValue(data.user?.email);
    });

    this.setRemember(this.authSession.getRemembeMe());
  }

  protected getForm() {
    return  this.fb.group({
      email: new FormControl({value:'',disabled:false}, [Validators.required, Validators.email]),
      password: new FormControl({value:'',disabled:false}, [Validators.required, Validators.minLength(6)]),
      remember: new FormControl({value:false,disabled:false}, []),
    });
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
    return field.valueChanges.pipe(
      tap((value)=>{
        this.loginRemember = value;
        this.authSession.setRemembeMe(value);
      }),
      filter(value=>value),
      switchMap((value: any)=>{
        return this.currentUser.handle().pipe(
          map(user=>{ 
            if(!user) {
              this.loginRemember = false;
            }
            return {user, rememberMe: value}
          }),
          filter(data=>{
            return data.user ? true : false;
          })
        );
      })
    );
  }

  redirectMain() {
    if(!this.userRememberMe.user)  return;
    this.redirectMain$.next(this.userRememberMe.user);
  }

}
