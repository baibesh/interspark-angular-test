import { Component, Input, OnInit } from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { IJob } from '../../interfaces/job.interface';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class JobUpdateComponent implements OnInit {
  @Input() job!: IJob;

  constructor(
    private readonly activeModalService: NgbActiveModal,
    public modalConfig: NgbModalConfig
  ) {}

  ngOnInit(): void {
    console.log(this.job);
  }

  close(): void {
    this.activeModalService.close(false);
  }
}
