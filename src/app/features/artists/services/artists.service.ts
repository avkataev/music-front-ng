import {delay, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Artist {
  id: number;
  title: string;
  dateStart: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http.get<Artist[]>('assets/data/artists.json')

    //return of(mockData).pipe(delay(500));
  }
}
