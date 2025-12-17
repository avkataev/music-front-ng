import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArtistsService} from '../../services/artists.service';
import {MyCard} from '../../../../shared/components/my-card/my-card';
import {Artist} from '../../models/artist.model';
import {AuthService} from '../../../auth/services/auth.service';

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
  likedByMe = signal<boolean>(false)
  totalLikes = signal<number>(0)

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._artistsService.findById(id).subscribe((artist) => {
      artist ? this.artist.set(artist) : null
      this.likedByMe.set(Boolean(artist.likedByMe))
      this.totalLikes.set(+artist.totalLikes)
    })
  }

  onClickToggleFollow(event: Event) {
    event.preventDefault();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this._artistsService.toggleLike(id).subscribe({
      next: (response) => {
        this.likedByMe.set(response?.liked || false);

        this.totalLikes.update(count =>
          response.liked ? count + 1 : count - 1
        );
      },
      error: err => console.error('err', err),
    });
  }
}
