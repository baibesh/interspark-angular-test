import { Component, Input } from '@angular/core';
import { IJob } from '../../interfaces/job.interface';
import { JobUpdateComponent } from '../job-update/job-update.component';
import { takeUntil } from 'rxjs';
import { JobService } from '../../services/job.service';
import { DestroyService } from '../../../../core/services/destroy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-btn-actions',
  templateUrl: './btn-actions.component.html',
  styleUrls: ['./btn-actions.component.scss'],
})
export class BtnActionsComponent {
  @Input() job!: IJob;
  id: string | null;

  constructor(
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService,
    private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  update(job: IJob): void {
    const modalRef = this.modalService.open(JobUpdateComponent, {
      centered: true,
    });
    modalRef.componentInstance.job = job;
  }

  delete(id: number): void {
    this.jobService
      .deleteJob(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (this.id) {
            this.router.navigate(['/jobs']).then();
          } else {
            this.jobService.loadJob$.next(true);
          }
        },
        error: (err) => {
          console.log(err);
          if (this.id) {
            this.router.navigate(['/jobs']).then();
          } else {
            this.jobService.loadJob$.next(false);
          }
        },
      });
  }
}
