import {Routes} from '@angular/router';
import {ArtistList} from './pages/list/artist-list';
import {ArtistDetail} from './pages/detail/artist-detail';
import {MainLayout} from '../../layouts/main-layout/main-layout';
import {ArtistCreate} from './pages/create/artist-create';
import {ArtistEdit} from './pages/edit/artist-edit';

export const artistsRoutes: Routes = [
  {
    path: 'artists',
    component: MainLayout,
    children: [
      {
        path: '',
        component: ArtistList
      },
      {
        path: 'create',
        component: ArtistCreate
      },
      {
        path: ':id/edit',
        component: ArtistEdit
      },
      {
        path: ':id',
        component: ArtistDetail
      },
    ]
  },
];
