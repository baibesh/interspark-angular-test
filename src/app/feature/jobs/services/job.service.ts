import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IJob } from '../interfaces/job.interface';
import { ICreateJob } from '../interfaces/create-job.interface';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  loadJob$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  getJobs(search?: string): Observable<IJob[]> {
    this.loadJob$.next(false);
    return this.http.get<IJob[]>(
      `http://localhost:3000/jobs${search ? '?q=' + search : ''}`
    );
  }

  getJob(id: string): Observable<IJob> {
    return this.http.get<IJob>(`http://localhost:3000/jobs/${id}`);
  }

  createJob(job: ICreateJob): Observable<IJob> {
    const data = {
      ...job,
      number_of_opening: 0,
      job_number: this.generateJobNumber(),
      job_start_date: this.toNativeDate(job.job_start_date),
      job_close_date: this.toNativeDate(job.job_close_date),
    };
    console.log('Create Job data');
    console.log(data);
    return this.http.post<IJob>(`http://localhost:3000/jobs`, data);
  }

  updateJob(id: number, job: ICreateJob): Observable<IJob> {
    const data = {
      ...job,
      job_number: this.generateJobNumber(),
      job_start_date: this.toNativeDate(job.job_start_date),
      job_close_date: this.toNativeDate(job.job_close_date),
    };
    console.log('Create Job data');
    console.log(data);
    return this.http.patch<IJob>(`http://localhost:3000/jobs/${id}`, data);
  }

  openJob(job: IJob): Observable<IJob> {
    return this.http.patch<IJob>(`http://localhost:3000/jobs/${job.id}`, {
      number_of_opening: job.number_of_opening + 1,
    });
  }

  generateJobNumber(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let resultString = '';
    let resultNumber = '';
    for (let i = 0; i < 3; i++) {
      resultString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      resultNumber += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }
    return resultNumber + '-' + resultString;
  }

  deleteJob(id: number): Observable<{}> {
    return this.http.delete<{}>(`http://localhost:3000/jobs/${id}`);
  }

  private toNativeDate(date: NgbDateStruct): Date {
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    jsDate.setFullYear(date.year);
    console.log(jsDate);
    return jsDate;
  }
}
