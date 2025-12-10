import {Component, signal} from '@angular/core';
import {form, Field, required, minLength, validate} from '@angular/forms/signals'
import {MyCard} from '../../../../shared/components/my-card/my-card';
import {NgClass} from '@angular/common';

interface ArtistData {
  title: string;
  dateStart: string;
  type?: string;
  genres: string;
  description: string;
  countries: string;
  cities: string;
  imageUrl: string;
}

type ArtistFieldKey = keyof ArtistData;
export enum ArtistFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea'
}


interface ArtistField {
  label: string;
  value: ArtistFieldKey;
  type: ArtistFieldType;
  placeholder: string;
}

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
  selector: 'app-artist-create',
  imports: [
    Field,
    MyCard,
    NgClass
  ],
  templateUrl: './artist-create.html',
})
export class ArtistCreate {
  artistModel = signal<ArtistData>({
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
    const payload = this.artistModel();
    console.log('payload', payload);
  }
}
