import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environment/environment';
import {ArtistCreateRequest, ArtistResponse, ArtistUpdateRequest} from '../models/artist.api';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<ArtistResponse[]>(environment.apiUrl + 'artist', { withCredentials: true })
  }
  findById(id: number) {
    return this.http.get<ArtistResponse>(environment.apiUrl + 'artist/' + id)
  }
  remove(id: number): Observable<ArtistResponse> {
    return this.http.delete<ArtistResponse>(environment.apiUrl + 'artist/' + id);
  }
  create(artist: ArtistCreateRequest): Observable<ArtistResponse> {
    return this.http.post<ArtistResponse>(environment.apiUrl + 'artist', artist)
  }
  update(id: number, artist: ArtistUpdateRequest): Observable<ArtistResponse> {
    return this.http.put<ArtistResponse>(environment.apiUrl + 'artist/' + id, artist)
  }
}
