import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <h2>Connexion</h2>
    <form (submit)="onSubmit()">
      <input [(ngModel)]="email" placeholder="Email" name="email"/>
      <input [(ngModel)]="password" placeholder="Mot de passe" type="password" name="password"/>
      <button type="submit">Se connecter</button>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private readonly authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => console.log('Login successful'),
      error: (err) => console.error('Login failed', err)
    });
  }
}
