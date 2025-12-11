import {ArtistCreateRequest, ArtistResponse, ArtistUpdateRequest} from '../models/artist.api';
import {Artist} from '../models/artist.model';
import {ArtistFormDto} from '../models/artistFormDto';

export function mapArtistResponseToArtist(dto: ArtistResponse): Artist {
  return {...dto};
}

export function mapArtistResponseToArtistForm(dto: ArtistResponse): ArtistFormDto {
  const { id, dateStart, ...rest } = dto;
  return {
    ...rest,
    dateStart: String(dateStart),
    genres: rest.genres.join('\n'),
    countries: rest.countries.join('\n'),
    cities: rest.cities.join('\n'),
  };
}

export function mapArtistFormToArtistRequest(dto: ArtistFormDto): ArtistCreateRequest | ArtistUpdateRequest {
  const { dateStart, genres, countries, cities, ...rest } = dto;
  return {
    ...dto,
    dateStart: +dateStart,
    genres: dto.genres.split('\n').map(v => v.trim()).filter(Boolean) || [],
    countries: dto.countries.split('\n').map(v => v.trim()).filter(Boolean) || [],
    cities: dto.cities.split('\n').map(v => v.trim()).filter(Boolean) || [],
  };
}
