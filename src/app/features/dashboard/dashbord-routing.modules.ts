import { RouterModule, Routes } from '@angular/router';
import { BarDashboardOlympicComponent } from './components/bar-dashboard-olympic/bar-dashboard-olympic.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'country',   redirectTo: '', pathMatch: 'full'
  },
  {
   path: 'country/:id', component: BarDashboardOlympicComponent 
  },
  
];

export const DashbordModuleRouting  = RouterModule.forChild(routes);