import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface ICreateJob {
  job_title: string;
  job_start_date: NgbDateStruct;
  job_close_date: NgbDateStruct;
  experience_required: boolean;
  job_notes: string;
}
