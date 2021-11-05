import { Injectable } from '@angular/core';
import { ApiService } from "../../../core/services/api.service";
import { Observable } from "rxjs";
import { Film } from "../models/film.model";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private api: ApiService) { }

  getListFilms(): Observable<Film[]> {
    return this.api.get<Film[]>('films');
  }
  searchFilms(searchText: string): Observable<Film[]> {
    return this.api.get<Film[]>('films').pipe(map(films => films.filter(film => film.title.toLowerCase().includes(searchText.toLowerCase()))));
  }

  getFilmById(id: string): Observable<Film> {
    return this.api.get<Film>(`films/${id}`);
  }

  getExtra<T>(extra: string, id: string): Observable<T> {
    return this.api.get<T>(`${extra}/${id}`)
  }
}
