import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/feature/home/home.component').then(
        (c) => c.HomeComponent
      ),
    title: 'Home',
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('src/app/feature/jobs/jobs.module').then((m) => m.JobsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
