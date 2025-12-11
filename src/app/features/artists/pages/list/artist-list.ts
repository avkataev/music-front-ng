import {Component, computed, inject, signal} from '@angular/core';
import {ArtistsService} from '../../services/artists.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NotificationService} from '../../../notifications/services/notifications.service';
import {tap} from 'rxjs';
import {Artist} from '../../models/artist.model';


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

  constructor(private notifications: NotificationService) {
    this.getArtists()
  }

  onSearch(term: string) {
    this.search.set(term);
  }

  onRemove(id: number) {
    this._artistsService.remove(id)
      .subscribe({
        next: (data) => {
          this.notifications.show({
            type: 'success',
            message: `${data.title} успешно удален`,
          });
          this.getArtists()
        },
        error: (err) => console.error(err)
      })

  }

  getArtists() {
    this._artistsService.findAll()
      .subscribe((artists: any) => this.artists.set(artists));
  }

}
