import { Component } from '@angular/core';
import {MyCard} from '../../../../shared/components/my-card/my-card';
import {ArtistForm} from '../../components/artist-form/artist-form';

@Component({
  selector: 'app-artist-edit',
  imports: [
    ArtistForm
  ],
  templateUrl: './artist-edit.html',
})
export class ArtistEdit {

}
