import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Artist, ArtistsService} from '../../services/artists.service';
import {MyCard} from '../../../../shared/components/my-card/my-card';

@Component({
  selector: 'app-artist-detail',
  imports: [
    MyCard
  ],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.css',
})
export class ArtistDetail {
  private _artistsService = inject(ArtistsService);
  route = inject(ActivatedRoute)
  artist = signal<Artist | null>(null)

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('artist detail', id);
    // Берём список артистов из сервиса и находим нужного
    this._artistsService.findById(id).subscribe((artist) => artist ? this.artist.set(artist) : null)
  }
}
