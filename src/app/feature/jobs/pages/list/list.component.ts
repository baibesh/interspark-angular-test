import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Observable } from 'rxjs';
import { IJob } from '../../interfaces/job.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  jobs$: Observable<IJob[]>;

  constructor(private readonly jobService: JobService) {
    this.jobs$ = this.jobService.getJobs();
  }
}
