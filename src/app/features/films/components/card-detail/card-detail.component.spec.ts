import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailComponent } from './card-detail.component';
import { TranslateModule } from "@ngx-translate/core";
import { film } from "../../models/film.fixture";
import { MatCardModule } from "@angular/material/card";

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDetailComponent ],
      imports: [TranslateModule.forRoot(), MatCardModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot()
  });
  it('should show one film card', () => {
    component.film = film;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot()
  });
});
