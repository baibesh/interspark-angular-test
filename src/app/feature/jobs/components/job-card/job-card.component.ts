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
}
