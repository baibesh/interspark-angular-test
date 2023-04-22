import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ICreateJob } from '../../interfaces/create-job.interface';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DestroyService } from '../../../../core/services/destroy.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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
    private readonly destroy$: DestroyService,
    private readonly router: Router
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
        job_start_date: this.form.value.job_start_date,
        job_close_date: this.form.value.job_close_date,
        job_notes: this.form.value.job_notes,
        experience_required: this.form.value.experience_required,
        job_title: this.form.value.job_title,
      };

      this.jobService
        .createJob(job)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (v) => {
            this.router.navigate(['/jobs']).then();
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
