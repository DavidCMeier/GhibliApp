import { Component, OnInit } from '@angular/core';
import { FilmService } from "../../services/film.service";
import { combineLatest, Observable } from "rxjs";
import { Film } from "../../models/film.model";
import { ActivatedRoute } from "@angular/router";
import { Person } from "../../../../shared/models/person.model";
import { Extras } from "../../models/extras.model";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  film$!: Observable<Film>;
  extras = Extras
  constructor(private route: ActivatedRoute, private filmService: FilmService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.getFilmById(params.id);
      }
    });
  }

  getFilmById(id: string) {
    this.film$ = this.filmService.getFilmById(id);
  }


  getExtra(extraSelected: Extras, urls: string[]) {
    return combineLatest(urls.map(url => this.getDataExtra(extraSelected, url)))
  }

  getDataExtra(extraSelected: Extras, url: string) {
    const urlSplit = url.split('/');
    const uuid = urlSplit[urlSplit.length - 1];
    const call = this.prepareCall(extraSelected, uuid)
    return extras[extraSelected];
  }

  prepareCall(extraSelected: Extras, uuid: string){
    return () => {
      const extras = {
        [Extras.people]: this.filmService.getExtra<Person>(extraSelected, uuid),
        [Extras.species]: this.filmService.getExtra<Person>(extraSelected, uuid),
        [Extras.locations]: this.filmService.getExtra<Person>(extraSelected, uuid),
        [Extras.vehicles]: this.filmService.getExtra<Person>(extraSelected, uuid)
      };

      const val = this.filmService.getExtra
      val<Person>(extraSelected, uuid)
    }
  }

}
