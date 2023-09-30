import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/countdown-event/countdown-event.component').then(
        (mod) => mod.CountdownEventComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-event',
    loadComponent: () =>
      import('./features/create-event/create-event.component').then(
        (mod) => mod.CreateEventComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./features/callback/callback.component').then(
        (mod) => mod.CallbackComponent
      ),
  },
];
