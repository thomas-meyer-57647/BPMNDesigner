import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { HalloworldComponent } from './halloworld/halloworld.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/layout/error/error.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/layout/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CanvasComponent,
    HalloworldComponent,
    ErrorComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
