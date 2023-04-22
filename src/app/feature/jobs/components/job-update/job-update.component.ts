import { Component, Input, OnInit } from '@angular/core';
import {
  NgbActiveModal,
  NgbDate,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { IJob } from '../../interfaces/job.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateJob } from '../../interfaces/create-job.interface';
import { takeUntil } from 'rxjs';
import { JobService } from '../../services/job.service';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class JobUpdateComponent implements OnInit {
  @Input() job!: IJob;
  form!: FormGroup;

  constructor(
    private readonly activeModalService: NgbActiveModal,
    private readonly fb: FormBuilder,
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      job_title: [this.job.job_title, [Validators.required]],
      job_notes: [this.job.job_notes],
      job_start_date: [this.toNbbDate(this.job.job_start_date)],
      job_close_date: [this.toNbbDate(this.job.job_close_date)],
      experience_required: [this.job.experience_required],
    });
  }

  close(): void {
    this.activeModalService.close(false);
  }

  update(): void {
    if (this.form.valid) {
      const job: ICreateJob = {
        job_title: this.form.value.job_title,
        experience_required: this.form.value.experience_required,
        job_notes: this.form.value.job_notes,
        job_close_date: this.form.value.job_close_date,
        job_start_date: this.form.value.job_start_date,
      };

      this.jobService
        .updateJob(this.job.id, job)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.jobService.loadJob$.next(true);
            this.activeModalService.close(true);
          },
          error: (err) => {
            console.log(err);
            this.activeModalService.close(false);
          },
        });
    }
  }

  toNbbDate(date: Date): any {
    return {
      year: new Date(date).getUTCFullYear(),
      month: new Date(date).getUTCMonth() + 1,
      day: new Date(date).getUTCDate(),
    };
  }
}
