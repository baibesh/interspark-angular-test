import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { JobService } from '../../services/job.service';
import { takeUntil } from 'rxjs';
import { IJob } from '../../interfaces/job.interface';
import { DestroyService } from '../../../../core/services/destroy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  jobs: IJob[] = [];
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService
      .getJobs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.jobs = value;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
          this.router.navigate(['/']).then();
        },
      });
  }
}
