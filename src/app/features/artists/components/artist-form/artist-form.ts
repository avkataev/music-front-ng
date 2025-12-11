import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Field, form, minLength, required, validate} from '@angular/forms/signals';
import {MyCard} from '../../../../shared/components/my-card/my-card';
import {NgClass} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ArtistsService} from '../../services/artists.service';
import {ArtistField, ArtistFieldType} from '../../models/artist.field';
import {ArtistFormDto} from '../../models/artistFormDto';
import {mapArtistFormToArtistRequest, mapArtistResponseToArtistForm} from '../../mappers/artist.mappers';
import {NotificationService} from '../../../notifications/services/notifications.service';
import { Router } from '@angular/router';

function url(field: any, options?: { message?: string }) {
  validate(field, ({value}) => {
    try {
      new URL(value() as string)
      return null
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Enter a valid URL'
      }
    }
  })
}


@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [
    MyCard,
    NgClass,
    Field,
  ],
  templateUrl: './artist-form.html',
})
export class ArtistForm {
  route = inject(ActivatedRoute)
  private _artistsService = inject(ArtistsService);

  artistModel = signal<ArtistFormDto>({
    title: '',
    dateStart: '',
    type: '',
    genres: '',
    description: '',
    countries: '',
    cities: '',
    imageUrl: '',
  });

  artistField: ArtistField[] = [
    {
      label: 'Название',
      value: 'title',
      type: ArtistFieldType.TEXT,
      placeholder: 'Название'
    },
    {
      label: 'Фото',
      value: 'imageUrl',
      type: ArtistFieldType.TEXT,
      placeholder: 'URL'
    },
    {
      label: 'Описание',
      value: 'description',
      type: ArtistFieldType.TEXTAREA,
      placeholder: 'Описание'
    },
    {
      label: 'Жанры',
      value: 'genres',
      type: ArtistFieldType.TEXTAREA,
      placeholder: 'Каждый жанр с новой строки'
    },
    {
      label: 'Страны',
      value: 'countries',
      type: ArtistFieldType.TEXTAREA,
      placeholder: 'Каждая страна с новой строки'
    },
    {
      label: 'Города',
      value: 'cities',
      type: ArtistFieldType.TEXTAREA,
      placeholder: 'Каждый город с новой строки'
    },
  ]

  isEdit = computed(() => {
    return this.id() !== null
  })
  id = computed(() => {
    const id = this.route.snapshot.paramMap.get('id')
    return id ? Number(id) : null
  });
  constructor(private notifications: NotificationService, private router: Router) {
    if (this.isEdit()) {
      this._artistsService.findById(this.id() as number).subscribe(artist => {
        if (artist) {
          this.artistModel.set(mapArtistResponseToArtistForm(artist));
        }
      });
    }
  }

  artistForm = form(this.artistModel, (schemaPath) => {
    required(schemaPath.title, { message: 'Название не может быть пустым' });
    minLength(schemaPath.title, 3, { message: 'Название не может быть меньше 3 символов' })
    url(schemaPath.imageUrl, { message: 'Введите корректный URL' })
    required(schemaPath.description, { message: 'Описание не может быть пустым' });
    minLength(schemaPath.description, 3, { message: 'Описание не может быть меньше 3 символов' })
    required(schemaPath.genres, { message: 'Укажите хотябы один жанр' });
    required(schemaPath.countries, { message: 'Укажите хотябы одину страну' });
    required(schemaPath.cities, { message: 'Укажите хотябы один город' });
  })

  onSubmit(event: Event) {
    event.preventDefault();
    const payload = mapArtistFormToArtistRequest(this.artistModel())
    if (this.isEdit()) {
      this._artistsService.update(this.id() as number, payload).subscribe({
        next: (data) => {
          console.log('next data', data)
          this.notifications.show({
            type: 'success',
            message: `${data.title} успешно изменен`,
          });
          this.router.navigate(['/artists', this.id()])
        },
        error: (err) => console.error(err)
      })
    } else {
      this._artistsService.create(payload).subscribe({
        next: (data) => {
          this.notifications.show({
            type: 'success',
            message: `${data.title} успешно создан`,
          });
          this.router.navigate(['/artists'])
        },
        error: (err) => console.error(err)
      })
    }
  }
}
