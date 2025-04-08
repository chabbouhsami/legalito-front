import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GenerateLettreComponent } from './generate-lettre/generate-lettre.component';
import { HomeComponent } from './home/home.component';
import { SelectionModeleComponent } from './selection-modele/selection-modele.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'modeles', component: SelectionModeleComponent },
  { path: 'generate/:id', component: GenerateLettreComponent },
  { path: '**', redirectTo: 'generate' }
];
