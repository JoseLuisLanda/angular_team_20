import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
