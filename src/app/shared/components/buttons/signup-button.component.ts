import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button mat-raised-button color="accent" (click)="handleSignUp()">
      Sign Up
    </button>
  `,
})
export class SignupButtonComponent {
  constructor(private auth: AuthService) {}

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
