import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.css']
})

  export class VerificationEmailComponent implements OnDestroy {
    public user$: Observable<any> = this.authSvc.afAuth.user;
  
    constructor(private authSvc: AuthService) {}
  
    onSendEmail(): void {
      this.authSvc.sendVerificationEmail();
    }
  
    ngOnDestroy() {
      this.authSvc.logout();
    }
  }
