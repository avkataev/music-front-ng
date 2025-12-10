import {Component, computed, inject, signal} from '@angular/core';
import {Artist, ArtistsService} from '../../services/artists.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './artist-list.html',
})


export class ArtistList {
  private _artistsService = inject(ArtistsService);
  artists = signal<Artist[]>([]);
  search = signal('');
  searchInput = ''

  filteredArtists = computed(() =>
    this.artists().filter(a =>
      a.title.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  onSearch(term: string) {
    this.search.set(term);
  }

  constructor() {
    this._artistsService.findAll()
      .subscribe((artists: any) => this.artists.set(artists));
  }

}
