import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTabContentComponent } from './weather-tab-content.component';

describe('WeatherTabContentComponent', () => {
  let component: WeatherTabContentComponent;
  let fixture: ComponentFixture<WeatherTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
