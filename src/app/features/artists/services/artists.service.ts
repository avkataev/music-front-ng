import {delay, map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Artist {
  id: number;
  title: string;
  dateStart: number;
  genres: string[]
  countries: string[]
  cities: string[]
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http.get<Artist[]>('assets/data/artists.json')
  }
  findById(id: number): Observable<Artist | undefined> {
    return this.findAll().pipe(
      map(artists => artists.find(a => a.id === id))
    );
  }
}
