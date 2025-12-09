import {Component, computed, inject, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {Artist, ArtistsService} from '../../services/artists.service';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})


export class ArtistsPage {
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
