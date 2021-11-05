import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Film } from "../../../features/films/models/film.model";

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilmComponent{

  @Input() film!: Film

}
