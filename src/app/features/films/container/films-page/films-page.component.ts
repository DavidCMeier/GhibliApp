import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService } from "../../services/film.service";
import { Observable } from "rxjs";
import { Film } from "../../models/film.model";
import { Store } from "@ngrx/store";
import * as fromCoreStore from '../../../../core/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsPageComponent implements OnInit {

  films$: Observable<Film[]> = this.store$.select(fromStore.getFilmsList);
  loading$: Observable<boolean> = this.store$.select(fromStore.getFilmsLoading);
  constructor(private store$: Store<fromStore.FilmsState>) { }

  ngOnInit(): void {
    this.store$.dispatch(fromStore.loadFilms());
  }

  openFilm(id: string){
    this.store$.dispatch(fromCoreStore.go({commands: ['/films', id]}));
  }

}
