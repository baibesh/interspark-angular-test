import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NewComponent } from './pages/new/new.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    title: 'Jobs list'
  },
  {
    path: 'new',
    component: NewComponent,
    title: 'Create job'
  },
  {
    path: ':id',
    component: DetailComponent,
    title: 'Detail information'
  }
];

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class JobsModule { }
