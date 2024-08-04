import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
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
    path: 'update-event/:id',
    loadComponent: () =>
      import('./features/update-event/update-event.component').then(
        (mod) => mod.UpdateEventComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'fruits-ordering-order',
    loadComponent: () =>
      import('./features/fruits-ordering-orders/fruits-ordering-orders.component').then(
        (mod) => mod.FruitsOrderingOrdersComponent),
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
