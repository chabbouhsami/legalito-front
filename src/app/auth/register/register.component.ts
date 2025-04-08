import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <h2>Inscription</h2>
    <form (submit)="onSubmit()">
      <input [(ngModel)]="email" placeholder="Email" name="email"/>
      <input [(ngModel)]="password" placeholder="Mot de passe" type="password" name="password"/>
      <button type="submit">S'inscrire</button>
    </form>
  `
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private readonly authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.email, this.password).subscribe({
      next: () => console.log('Inscription réussie'),
      error: (err) => console.error('Erreur d’inscription', err)
    });
  }
}
