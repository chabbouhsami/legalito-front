import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GenerateLetterComponent } from './dashboard/generate-letter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'generate', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'generate', component: GenerateLetterComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'generate' }
];
