import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService } from "../../../films/services/film.service";
import * as fromCoreStore from "../../../../core/store";
import * as fromStore from "../../store";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  films$ = this.store$.select(fromStore.getFilmsSearched);
  loading$ = this.store$.select(fromStore.getSearchLoading)
  constructor(private filmService: FilmService, private store$: Store<fromStore.SearchState>) { }

  ngOnInit(): void {
  }

  searchFilm(searchText: string) {
    this.store$.dispatch(fromStore.loadSearchedFilm({ query: searchText }));
  }

  openFilm(id: string){
    this.store$.dispatch(fromCoreStore.go({commands: ['/films', id]}));
  }
}
