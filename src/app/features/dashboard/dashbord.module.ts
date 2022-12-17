import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieDashboardOlympicComponent } from './components/pie-dashboard-olympic/pie-dashboard-olympic.component';
import { BarDashboardOlympicComponent } from './components/bar-dashboard-olympic/bar-dashboard-olympic.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashbordModuleRouting } from './dashbord-routing.modules';

@NgModule({
  declarations: [PieDashboardOlympicComponent,BarDashboardOlympicComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    DashbordModuleRouting
  ],

  exports:[PieDashboardOlympicComponent,BarDashboardOlympicComponent]
})
export class DashbordModule { }
