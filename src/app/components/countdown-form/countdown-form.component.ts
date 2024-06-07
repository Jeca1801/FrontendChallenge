import {Component, OnInit} from '@angular/core'
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CountdownFormService} from "../../shared/service/countdown-form.service";
import {CountdownFormModel} from "../../shared/model/countdown-form.model";
import {CountdownDateInputComponent} from "../../shared/components/countdown-date-input/countdown-date-input.component";
import {CountdownTitleInputComponent} from "../../shared/components/countdown-title-input/countdown-title-input.component";

@Component({
  selector: 'app-countdown-form',
  standalone: true,
  imports: [CountdownTitleInputComponent, CountdownDateInputComponent, ReactiveFormsModule],
  templateUrl: './countdown-form.component.html',
  styleUrl: './countdown-form.component.scss'
})
export class CountdownFormComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>()
  countdownForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  })

  constructor(private countdownFormService: CountdownFormService) {}

  ngOnInit(): void {
    this.countdownFormService.getFormState()

    this.countdownFormService.formState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      if (state) {
        this.countdownForm.patchValue({
          title: state.title,
          date: new Date(state.date).toISOString().slice(0, 10),
        })
      }
    })
  }

  onDateChange(): void {
    if (this.countdownForm.valid) {
      this.onSubmit()
    }
  }

  onBlur(): void {
    if (this.countdownForm.valid) {
      this.onSubmit()
    }
  }

  onSubmit(): void {
    const formValue: CountdownFormModel = {
      title: this.countdownForm.get('title')?.value || '',
      date: this.countdownForm.get('date')?.value || new Date(),
    }
    this.countdownFormService.setFormState(formValue)
  }
}
