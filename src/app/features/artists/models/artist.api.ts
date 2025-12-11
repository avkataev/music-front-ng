export interface ArtistResponse {
  id: number;
  title: string;
  dateStart: number;
  type: string;
  genres: string[];
  description: string;
  countries: string[];
  cities: string[];
  imageUrl: string;
}

export type ArtistCreateRequest = Omit<ArtistResponse, 'id'>;

export type ArtistUpdateRequest = Omit<ArtistResponse, 'id'>;
