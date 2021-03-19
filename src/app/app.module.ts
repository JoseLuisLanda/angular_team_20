import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CopyrightComponent } from './pages/copyright/copyright.component';
import { TermsprivacyComponent } from './pages/termsprivacy/termsprivacy.component';
import { RouterModule } from '@angular/router';
import { VerificationEmailComponent } from './pages/utils/verification-email/verification-email.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CounterComponent } from './pages/section/counter/counter.component';
import { TimeService } from './core/services/time.service';
//import { SponsorsComponent } from './pages/section/sponsor/sponsors/sponsors.component';
import { ComponentsModule } from './shared/components/components.module';
import { ProfiledetailsComponent } from './pages/profile/profiledetails/profiledetails.component';
import { ProfileinsigniasComponent } from './pages/profile/profileinsignias/profileinsignias.component';
import { ProfilegruposComponent } from './pages/profile/profilegrupos/profilegrupos.component';
import { ProfileventosComponent } from './pages/profile/profileventos/profileventos.component';
import { EditComponent } from './pages/shared/CRUD/edit/edit.component';
import { NewComponent } from './pages/shared/CRUD/new/new.component';
import { ModalComponent } from './pages/shared/modal/modal.component';
import { UploadimageComponent } from './pages/utils/uploadimage/uploadimage.component';
import { NgDropFilesDirective } from 'src/app/core/directives/ng-drop-files.directive';
import { ProfileeditComponent } from './pages/profile/profileedit/profileedit.component';

@NgModule({
  declarations: [
    NgDropFilesDirective,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CopyrightComponent,
    TermsprivacyComponent,
    VerificationEmailComponent,
    ProfileComponent,
    CounterComponent,
    ProfiledetailsComponent,
    ProfileinsigniasComponent,
    ProfilegruposComponent,
    ProfileventosComponent,
    EditComponent,
    NewComponent,
    ModalComponent,
    UploadimageComponent,
    // SponsorsComponent
    ProfileeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ComponentsModule,
  ],
  providers: [TimeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
