import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDashboardOlympicComponent } from './bar-dashboard-olympic.component';

describe('BarDashboardOlympicComponent', () => {
  let component: BarDashboardOlympicComponent;
  let fixture: ComponentFixture<BarDashboardOlympicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDashboardOlympicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarDashboardOlympicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
