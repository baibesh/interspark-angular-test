import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DestroyService } from '../../core/services/destroy.service';
import { debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl<string>('');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly destroy$: DestroyService
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: (query) => {
        if (query['q']) {
          this.search.setValue(query['q']);
        } else {
          this.search.setValue('');
        }
      },
    });
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(700), takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.router.navigate([], {
            queryParams: {
              q: value.length > 0 ? value : undefined,
            },
          });
        },
      });
  }
}
