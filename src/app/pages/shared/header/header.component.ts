import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavbarService } from '../../../core/services/navbar.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ElementId } from 'src/app/shared/models/element';
import { AfsService } from 'src/app/core/services/afs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public currentUser: ElementId = {uid:"",images:[{uid:"",url:"assets/img/no-profile.png"}]};
  imagePath = "assets/img/no-profile.png";

  constructor(public authSvc: AuthService, private router: Router,private afsService : AfsService) {}
  ngOnChanges(changes: SimpleChanges): void {
 
  }
  ngOnInit(): void {
    this.checkUserIsVerified();
  }

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
    if(userDta?.uid !== undefined){
      this.getUserProfile(userDta?.uid)
    }else{
      console.log("No user"+JSON.stringify(userDta))
    }
  }

  getUserProfile(userId: string){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   var doc = this.afsService.doc$(`users/${ userId }`).subscribe(res=>{
   this.currentUser = res as ElementId;
   if(this.currentUser.images){
    this.imagePath = this.currentUser.images[0].url!;
   }
   
  },err=>{console.log("error: "+err);})
  }
}
