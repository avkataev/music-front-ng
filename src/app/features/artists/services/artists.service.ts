import {delay, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

export interface Artist {
  id: number;
  title: string;
  dateStart: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  findAll() {
    const mockData: Artist[] = [
      {id: 1, title: 'Michael Jackson', dateStart: '1964'},
      {id: 2, title: 'Madonna', dateStart: '1979'},
      {id: 3, title: 'Prince', dateStart: '1978'},
      {id: 4, title: 'Elvis Presley', dateStart: '1954'}
    ];

    return of(mockData).pipe(delay(500));
  }
}
