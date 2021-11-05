import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService } from "../../services/film.service";
import { Observable } from "rxjs";
import { Film } from "../../models/film.model";
import { Store } from "@ngrx/store";
import * as fromStore from '../../../../core/store';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsPageComponent implements OnInit {

  films$: Observable<Film[]> = this.filmService.getListFilms();

  constructor(private filmService: FilmService, private store$: Store) { }

  ngOnInit(): void {
  }

  openFilm(id: string){
    this.store$.dispatch(fromStore.go({commands: ['/films', id]}));
  }

}
