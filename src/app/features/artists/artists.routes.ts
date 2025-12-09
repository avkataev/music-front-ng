import { Routes } from '@angular/router';
import { ArtistList } from './pages/list/artist-list';
import { ArtistDetail } from './pages/detail/artist-detail';
import {MainLayout} from '../../layouts/main-layout/main-layout';

export const artistsRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'artists',
        component: ArtistList
      },
      {
        path: 'artists/:id',
        component: ArtistDetail
      },
    ]
  },
];
