import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FilmService } from "../../services/film.service";
import { Observable } from "rxjs";
import { Film } from "../../models/film.model";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import * as fromCoreStore from "../../../../core/store";
import { take, withLatestFrom } from "rxjs/operators";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  film$ = this.store$.select(fromStore.getFilmDetail);
  loading$: Observable<boolean> = this.store$.select(fromStore.getFilmLoading);
  constructor(private store$: Store<fromStore.FilmsState>) { }

  ngOnInit(): void {
    this.store$
      .select(fromCoreStore.getRouteParams)
      .pipe(take(1), withLatestFrom(this.store$.select(fromCoreStore.getQueryParams)))
      .subscribe(([params, queryParams]) => {
        const uuid = params.id;
        console.log(queryParams)
        this.store$.dispatch(fromStore.loadFilm({uuid}));
      })
  }

  ngOnDestroy(): void {
    this.store$.dispatch(fromStore.unloadFilm());
  }

}
