import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from '../../interfaces/job.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobUpdateComponent } from '../job-update/job-update.component';
import { takeUntil } from 'rxjs';
import { JobService } from '../../services/job.service';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: IJob;
  @Output() loadJob: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService
  ) {}

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
        next: (value) => {
          console.log(value);
          this.loadJob.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
