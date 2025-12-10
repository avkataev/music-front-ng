import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Artist, ArtistsService} from '../../services/artists.service';
import {MyCard} from '../../../../shared/components/my-card/my-card';

@Component({
  selector: 'app-artist-detail',
  imports: [
    MyCard
  ],
  templateUrl: './artist-detail.html',
})
export class ArtistDetail implements OnInit {
  private _artistsService = inject(ArtistsService);
  route = inject(ActivatedRoute)
  artist = signal<Artist | null>(null)

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._artistsService.findById(id).subscribe((artist) => artist ? this.artist.set(artist) : null)
  }
}
