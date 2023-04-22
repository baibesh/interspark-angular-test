import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { DestroyService } from '../../../../core/services/destroy.service';
import { takeUntil } from 'rxjs';
import { IJob } from '../../interfaces/job.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: string | null;
  job!: IJob;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.loadJob(this.id);
    } else {
      this.router.navigate(['/jobs']).then();
    }

    this.jobService.loadJob$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (v) => {
        if (v && this.id) {
          this.loadJob(this.id);
        }
      },
    });
  }

  loadJob(id: string): void {
    this.jobService
      .getJob(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          console.log(value);
          this.job = value;

          this.jobService
            .openJob(value)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (res) => {
                this.job.number_of_opening = res.number_of_opening;
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/jobs']).then();
        },
      });
  }

  ngOnInit(): void {}
}
