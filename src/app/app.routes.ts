import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { AppelFondComponent } from './appel-fond/appel-fond.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'home', component: HomeComponent },
  {path: 'appeldufond', component: AppelFondComponent}
];
