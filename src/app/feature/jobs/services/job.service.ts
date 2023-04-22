import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJob } from '../interfaces/job.interface';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private readonly http: HttpClient) {}

  getJobs(): Observable<IJob[]> {
    return this.http.get<IJob[]>(`http://localhost:3000/jobs`);
  }
}
