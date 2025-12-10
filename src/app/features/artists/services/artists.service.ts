import {map, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environment/environment';

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
    return this.http.get<Artist[]>(environment.apiUrl + 'artist')
  }

  findById(id: number) {
    return this.http.get<Artist>(environment.apiUrl + 'artist/' + id)
  }
  remove(id: number): Observable<Artist> {
    return this.http.delete<Artist>(environment.apiUrl + 'artist/' + id);
  }
}
