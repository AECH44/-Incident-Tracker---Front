import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./iu/pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./iu/pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'my-incidents',
        loadComponent: () =>
          import('./iu/pages/home/home.page').then(m => m.HomePage), // luego cambias
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./iu/pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./iu/pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },

  {
    path: 'incident-detail/:id',
    loadComponent: () =>
      import('./iu/pages/incident-detail/incident-detail.page')
        .then(m => m.IncidentDetailPage)
  },

  {
    path: 'create-incident',
    loadComponent: () =>
      import('./iu/pages/create-incident/create-incident.page')
        .then(m => m.CreateIncidentPage)
  }

];