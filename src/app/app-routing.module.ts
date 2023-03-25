import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { ScreenComponent } from './components/screen/screen.component';
import { TurnsComponent } from './components/turns/turns.component';
import { RequestTurnComponent } from './components/request-turn/request-turn.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'entities', component: EntitiesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'patients', component: PatientsComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'screen', component: ScreenComponent},
  {path: 'turns', component: TurnsComponent},
  {path: 'request-turn', component: RequestTurnComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
