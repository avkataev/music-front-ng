import { Routes } from '@angular/router';
import { artistsRoutes } from './features/artists/artists.routes';
import {MainLayout} from './layouts/main-layout/main-layout';
import {Home} from './core/pages/home/home';

export const routes: Routes = [
  ...artistsRoutes,
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      }
    ]
  }
];
