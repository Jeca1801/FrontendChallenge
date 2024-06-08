import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

import { CountdownFormService } from '../../shared/service/countdown-form.service';
import { CountdownFormModel } from '../../shared/model/countdown-form.model';
import { CountdownDateInputComponent } from '../../shared/components/countdown-date-input/countdown-date-input.component';
import { CountdownTitleInputComponent } from '../../shared/components/countdown-title-input/countdown-title-input.component';

@Component({
  selector: 'app-countdown-form',
  standalone: true,
  imports: [CountdownTitleInputComponent, CountdownDateInputComponent, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './countdown-form.component.html',
  styleUrls: ['./countdown-form.component.scss']
})
export class CountdownFormComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  countdownForm: FormGroup;

  constructor(private formService: CountdownFormService) {
    this.countdownForm = new FormGroup({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.formService.getFormState();
    this.formService.formState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: CountdownFormModel | null): void => {
        if (state) {
          this.countdownForm.patchValue({
            title: state.title,
            date: new Date(state.date).toISOString().slice(0, 10),
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.countdownForm.valid) {
      const formValue: CountdownFormModel = this.countdownForm.value;
      this.formService.setFormState(formValue);
    }
  }

  onFieldChange(): void {
    this.onSubmit();
  }

  get titleControl(): FormControl {
    return this.countdownForm.get('title') as FormControl;
  }

  get dateControl(): FormControl {
    return this.countdownForm.get('date') as FormControl;
  }
}
