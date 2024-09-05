import { Routes } from '@angular/router';

export const rutas: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Ingreso de sesion',
        loadComponent: () => import('./auth/pages/login/login.component'),
      },
      {
        path: 'register',
        title: 'Registro de usuario',
        loadComponent: () => import('./auth/pages/register/register.component'),
      },
      {
        path: 'wellcome',
        title: 'Bienvenido',
        loadComponent: () => import('./auth/pages/wellcome/wellcome.component'),
      },
    ],
  },
  {
    path: 'geovisor',
    loadComponent: () => import('./geovisor/geovisor.component'),
    children: [
      {
        path: 'mapa',
        title: 'Mapa 2D',
        loadComponent: () => import('./geovisor/pages/map2d/map2d.component'),
      },
      {
        path: 'mapas',
        title: 'Mapa 3D',
        loadComponent: () => import('./geovisor/pages/map3d/map3d.component'),
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./geovisor/pages/dashboard/dashboard.component'),
      },
      {
        path: '',
        redirectTo: 'mapa',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'error404',
    title: 'Error 404',
    loadComponent: () => import('./shared/error404/error404.component'),
  },
  {
    path: '',
    redirectTo: 'geovisor',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full',
  },
];
