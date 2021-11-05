import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Film } from "../../../features/films/models/film.model";

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent implements OnInit {

  @Input() films!: Film[];
  @Output() selectedFilmId: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
