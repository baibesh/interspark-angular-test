import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJob } from '../interfaces/job.interface';
import { ICreateJob } from '../interfaces/create-job.interface';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private readonly http: HttpClient) {}

  getJobs(): Observable<IJob[]> {
    return this.http.get<IJob[]>(`http://localhost:3000/jobs`);
  }

  getJob(id: string): Observable<IJob> {
    return this.http.get<IJob>(`http://localhost:3000/jobs/${id}`);
  }

  createJob(job: ICreateJob): Observable<any> {
    const data = {
      ...job,
      number_of_opening: 0,
      job_number: this.generateJobNumber(),
    };
    console.log('Create Job data');
    console.log(data);
    return this.http.post(`http://localhost:3000/jobs`, data);
  }

  openJob(job: IJob): Observable<any> {
    return this.http.put(`http://localhost:3000/jobs/${job.id}`, {
      ...job,
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

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/jobs/${id}`);
  }
}
