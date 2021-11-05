import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-bar-search',
  templateUrl: './bar-search.component.html',
  styleUrls: ['./bar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarSearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();

  control = new FormControl('')
  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.pipe(debounceTime(300)).subscribe((value: string) => {
      this.search.emit(value);
    })
  }

}
