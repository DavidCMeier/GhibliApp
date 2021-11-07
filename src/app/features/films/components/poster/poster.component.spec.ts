import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterComponent } from './poster.component';
import { TranslateModule } from "@ngx-translate/core";

describe('PosterComponent', () => {
  let component: PosterComponent;
  let fixture: ComponentFixture<PosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosterComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
