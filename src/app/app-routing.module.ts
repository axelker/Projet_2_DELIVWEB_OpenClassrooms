import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarDashboardOlympicComponent } from './features/dashboard/components/bar-dashboard-olympic/bar-dashboard-olympic.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',loadChildren: () => import('./features/dashboard/dashbord.module').then(m => m.DashbordModule)
  },
  {
    path:'error', component : ErrorComponent
  },
  
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
