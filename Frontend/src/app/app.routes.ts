import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./iu/pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'incident-detail',
    loadComponent: () => import('./iu/pages/incident-detail/incident-detail.page').then(m => m.IncidentDetailPage)
  },
  {
    path: 'create-incident',
    loadComponent: () => import('./iu/pages/create-incident/create-incident.page').then(m => m.CreateIncidentPage)
  },
];
