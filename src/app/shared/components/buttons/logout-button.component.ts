import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button mat-raised-button color="warn" (click)="handleLogout()">
      Log Out
    </button>
  `,
})
export class LogoutButtonComponent {
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
