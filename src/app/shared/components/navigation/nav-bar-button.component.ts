import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../buttons/login-button.component';
import { SignupButtonComponent } from '../buttons/signup-button.component';
import { LogoutButtonComponent } from '../buttons/logout-button.component';

@Component({
  selector: 'app-nav-bar-button',
  standalone: true,
  imports: [
    CommonModule,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './nav-bar-button.component.html',
})
export class NavBarButtonComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  constructor(private authService: AuthService) {}
}
