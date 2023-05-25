import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { UsersComponent } from './components/users/users.component';
import { TurnsComponent } from './components/turns/turns.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScreenComponent } from './components/screen/screen.component';
import { RequestTurnComponent } from './components/request-turn/request-turn.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ModalPasswordComponent } from './components/modal-password/modal-password.component';
import { AreasComponent } from './components/areas/areas.component';
import { RoomsComponent } from './components/rooms/rooms.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    SubmenuComponent,
    EntitiesComponent,
    UsersComponent,
    TurnsComponent,
    SettingsComponent,
    ScreenComponent,
    RequestTurnComponent,
    PatientsComponent,
    ModalPasswordComponent,
    AreasComponent,
    RoomsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
