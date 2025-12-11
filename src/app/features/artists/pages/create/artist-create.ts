import {Component} from '@angular/core';
import {ArtistForm} from '../../components/artist-form/artist-form';

@Component({
  selector: 'app-artist-create',
  imports: [
    ArtistForm
  ],
  templateUrl: './artist-create.html',
})
export class ArtistCreate {
}
