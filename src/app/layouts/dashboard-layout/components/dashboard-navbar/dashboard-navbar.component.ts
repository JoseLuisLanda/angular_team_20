import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logout } from 'src/app/firebase/auth/logout';
import { AuthSession } from 'src/app/services/auth-session';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit {

  public authUser:any = {
    img: 'assets/images/undraw_profile.svg',
    name: ''
  }

  constructor(
    private authSession: AuthSession,
    private _logout: Logout,
    private router: Router) { }

  ngOnInit(): void {
    this.setAuthUser();
  }

  protected setAuthUser() {
    let authUser = this.authSession.getAuthUser();
    if(authUser) {
      this.authUser.img = authUser.photoURL || this.authUser.img;
      this.authUser.name = authUser.displayName || authUser.email;
    }
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
