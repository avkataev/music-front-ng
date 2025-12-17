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
  totalLikes: string;
  likedByMe: string;
}

export interface ArtistLikeToggleResponse {
  liked: boolean;
}

export type ArtistCreateRequest = Omit<ArtistResponse, 'id' | 'totalLikes' | 'likedByMe'>;

export type ArtistUpdateRequest = Omit<ArtistResponse, 'id' | 'totalLikes' | 'likedByMe'>;
