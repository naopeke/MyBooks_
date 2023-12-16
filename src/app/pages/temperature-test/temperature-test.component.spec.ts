import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureTestComponent } from './temperature-test.component';

describe('TemperatureTestComponent', () => {
  let component: TemperatureTestComponent;
  let fixture: ComponentFixture<TemperatureTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureTestComponent]
    });
    fixture = TestBed.createComponent(TemperatureTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
