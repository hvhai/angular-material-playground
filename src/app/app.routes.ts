import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

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
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./features/callback/callback.component').then(
        (mod) => mod.CallbackComponent
      ),
  },
];
