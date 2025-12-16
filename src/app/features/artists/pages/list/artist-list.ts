import {Component, computed, Inject, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {ArtistsService} from '../../services/artists.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../../../notifications/services/notifications.service';
import {tap} from 'rxjs';
import {Artist} from '../../models/artist.model';
import {isPlatformBrowser} from '@angular/common';


@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './artist-list.html',
})


export class ArtistList implements OnInit {
  private _artistsService = inject(ArtistsService);
  artists = signal<Artist[]>([]);
  search = signal('');
  searchInput = ''

  filteredArtists = computed(() =>
    this.artists().filter(a =>
      a.title.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  constructor(
    private notifications: NotificationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getArtists()
    }
  }

  onSearch(term: string) {
    this.search.set(term);
  }

  onEdit(id: number) {
    this.router.navigate(['/artists', id, 'edit'])
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
