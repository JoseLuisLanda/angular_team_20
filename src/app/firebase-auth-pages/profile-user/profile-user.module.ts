import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileUserRoutingModule } from './profile-user-routing.module';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';


@NgModule({
  declarations: [ProfileUserComponent, InformacionPersonalComponent],
  imports: [
    CommonModule,
    ProfileUserRoutingModule
  ]
})
export class ProfileUserModule { }
