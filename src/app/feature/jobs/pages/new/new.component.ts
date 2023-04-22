import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ICreateJob } from '../../interfaces/create-job.interface';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DestroyService } from '../../../../core/services/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly jobService: JobService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      job_title: ['', [Validators.required]],
      job_notes: [''],
      job_start_date: [],
      job_close_date: [],
      experience_required: [false],
    });
  }

  save(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const job: ICreateJob = {
        job_number: '451-AGR',
        job_start_date:
          this.form.value.job_start_date.year +
          '-' +
          (this.form.value.job_start_date.month - 1) +
          '-' +
          this.form.value.job_start_date.day,
        job_close_date:
          this.form.value.job_close_date.year +
          '-' +
          (this.form.value.job_close_date.month - 1) +
          '-' +
          this.form.value.job_close_date.day,
        job_notes: this.form.value.job_notes,
        experience_required: this.form.value.experience_required,
        job_title: this.form.value.job_title,
      };
      this.jobService
        .createJob(job)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (v) => {
            console.log('Response');
            console.log(v);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
