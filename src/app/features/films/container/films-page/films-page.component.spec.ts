import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsPageComponent } from './films-page.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";

describe('FilmsPageComponent', () => {
  let component: FilmsPageComponent;
  let fixture: ComponentFixture<FilmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmsPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
