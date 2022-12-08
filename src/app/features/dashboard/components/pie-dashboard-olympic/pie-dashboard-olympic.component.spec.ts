import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieDashboardOlympicComponent } from './pie-dashboard-olympic.component';

describe('PieDashboardOlympicComponent', () => {
  let component: PieDashboardOlympicComponent;
  let fixture: ComponentFixture<PieDashboardOlympicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieDashboardOlympicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieDashboardOlympicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
