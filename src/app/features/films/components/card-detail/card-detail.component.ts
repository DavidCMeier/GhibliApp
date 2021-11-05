import { Component, Input, OnInit } from '@angular/core';
import { Film } from "../../models/film.model";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input() film!: Film;
  constructor() { }

  ngOnInit(): void {
  }

}
