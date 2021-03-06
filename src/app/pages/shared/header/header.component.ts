import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../core/services/navbar.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {}

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  async checkUserIsVerified() {
    const userDta = await this.authSvc.isAuthenticated();
    if (userDta && userDta.emailVerified) {
      this.router.navigate(['/profile']);
    } else if (userDta) {
      this.router.navigate(['/verification']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
