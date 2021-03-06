import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.css'],
})
export class VerificationEmailComponent implements OnDestroy, OnInit {
  user$: Observable<any> = this.authSvc.afAuth.user;
  user: any;
  constructor(private authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {
    //this.doConsult();
  }
  async doConsult() {
    const userData = await this.authSvc.isAuthenticated();
    if (userData && userData.emailVerified) this.router.navigate(['/profile']);
    else this.router.navigate(['/home']);
  }
  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    //this.authSvc.logout();
  }
}
