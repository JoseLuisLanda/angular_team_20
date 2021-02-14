import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displayName : any;
  logged = false;
  constructor(public nav: NavbarService,
              private authService: AuthService,
              private router: Router) {
              }

  ngOnInit() {

    var logged = this.isLogged();
    if(logged)
      this.displayName = this.authService.getUserName();
    console.log('isLogged', this.isLogged());
  }

  isLogged(): boolean {
    return this.logged = this.authService.isAuthenticated();
  }
  logOut() {
    var out = this.authService.logOut();
    this.logged = false;
    this.ngOnInit();
    this.router.navigateByUrl('/login');
  }
}
