import { Component, Input } from '@angular/core';
import { IJob } from '../../interfaces/job.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobUpdateComponent } from '../job-update/job-update.component';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: IJob;

  constructor(private readonly modalService: NgbModal) {}

  update(job: IJob): void {
    const modalRef = this.modalService.open(JobUpdateComponent, {
      centered: true,
    });
    modalRef.componentInstance.job = job;
  }
}
