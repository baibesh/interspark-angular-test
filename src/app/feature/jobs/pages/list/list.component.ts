import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JobService } from 'src/app/feature/jobs/services/job.service';
import { takeUntil } from 'rxjs';
import { IJob } from 'src/app/feature/jobs/interfaces/job.interface';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
  jobs: IJob[] = [];
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: (query) => {
        if (query['q']) {
          this.loadJobs(query['q']);
        } else {
          this.loadJobs();
        }
      },
    });
    this.jobService.loadJob$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (v) => {
        if (v) {
          this.loadJobs();
        }
      },
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  loadJobs(search?: string): void {
    this.loading = true;
    this.jobService
      .getJobs(search ?? undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.jobs = value;
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
          this.router.navigate(['/']).then();
        },
      });
  }
}
