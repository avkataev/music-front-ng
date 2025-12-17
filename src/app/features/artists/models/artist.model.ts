export interface Artist {
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
