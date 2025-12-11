import {Artist} from './artist.model';
import {ArtistFormDto} from './artistFormDto';

type ArtistFieldKey = keyof ArtistFormDto;

export enum ArtistFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea'
}

export interface ArtistField {
  label: string;
  value: ArtistFieldKey;
  type: ArtistFieldType;
  placeholder: string;
}
