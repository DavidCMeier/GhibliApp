import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailComponent } from './film-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FilmService } from "../../services/film.service";
import { API_BASE_URL } from "../../../../root/tokens/tokens";
import { provideMockStore } from "@ngrx/store/testing";

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmDetailComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
