import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NewComponent } from './pages/new/new.component';
import { RouterModule, Routes } from '@angular/router';
import { JobCardComponent } from './components/job-card/job-card.component';
import { JobUpdateComponent } from './components/job-update/job-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { BoolToStrPipe } from '../../core/pipes/bool-to-str.pipe';
import { BtnActionsComponent } from './components/btn-actions/btn-actions.component';
import { SearchComponent } from '../../shared/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    title: 'Jobs list',
  },
  {
    path: 'new',
    component: NewComponent,
    title: 'Create job',
  },
  {
    path: ':id',
    component: DetailComponent,
    title: 'Detail information',
  },
];

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    NewComponent,
    JobCardComponent,
    JobUpdateComponent,
    BoolToStrPipe,
    BtnActionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbInputDatepicker,
    SearchComponent,
  ],
})
export class JobsModule {}
