import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <a routerLink="/">Legalito</a>
      <div>
        <ng-container *ngIf="auth.getToken(); else guest">
          <button (click)="logout()">Déconnexion</button>
        </ng-container>
        <ng-template #guest>
          <a routerLink="/login">Connexion</a>
          <a routerLink="/register">Inscription</a>
        </ng-template>
      </div>
    </nav>
  `,
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #3f51b5;
      color: white;
    }

    a, button {
      color: white;
      margin-left: 1rem;
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
    }

    button:hover, a:hover {
      text-decoration: underline;
    }
  `]
})
export class NavbarComponent {
  constructor(public readonly auth: AuthService, private readonly router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
