import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logout } from 'src/app/firebase/auth/logout';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit {

  constructor(
    private _logout: Logout,
    private router: Router) { }

  ngOnInit(): void {
  }

  profileUserNavigate() {
    this.router.navigate(['main/profile-user']);
  }

  salirNavigate() {
    this.logout();
  }

  logout() {
    this._logout.handle()
      .then(this.logoutOk.bind(this))
      .catch(this.logoutErr.bind(this))
  }

  logoutOk(response: any) {
    console.log("logoutOk", response);
    this.router.navigate(['auth/login']);
  }

  logoutErr(response: any) {
    console.log("logoutErr", response);
  }

}
