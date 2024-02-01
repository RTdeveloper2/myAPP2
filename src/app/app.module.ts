import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';  // Update this import
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Update this import
import { AppComponent } from './app.component';
import { AuthComponent } from './login/login.component';
import { firebaseConfig } from '../environment';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './landingPage/caraousal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { UpdateModalComponent } from './landingPage/updateModalcomponent/UpdateModalComponent';

@NgModule({
  declarations: [AppComponent, AuthComponent,CarouselComponent,UpdateModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),  // Update this line
    AngularFireAuthModule,  // Update this line
    CarouselModule.forRoot(),
    MatIconModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
