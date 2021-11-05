import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosterComponent implements OnInit {

  @Input() poster!: string;
  @Input() filmTitle!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
