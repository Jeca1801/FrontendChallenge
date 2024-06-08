import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountdownFormModel } from '../model/countdown-form.model';

@Injectable({
  providedIn: 'root',
})
export class CountdownFormService {
  private readonly _formState: BehaviorSubject<CountdownFormModel | null>;
  readonly formState$: Observable<CountdownFormModel | null>;

  constructor() {
    const initialState: CountdownFormModel = {
      title: 'Time to Midsummer Eve',
      date: new Date(2024, 5, 21)
    };
    this._formState = new BehaviorSubject<CountdownFormModel | null>(initialState);
    this.formState$ = this._formState.asObservable();
    this.loadInitialFormState();
  }

  setFormState(formState: CountdownFormModel): void {
    this._formState.next(formState);
    this.saveFormStateToLocalStorage(formState);
  }

  saveFormStateToLocalStorage(formState: CountdownFormModel): void {
    localStorage.setItem('formState', JSON.stringify(formState));
  }

   loadInitialFormState(): void {
    const savedState: string | null = localStorage.getItem('formState');
    if (savedState) {
      this._formState.next(JSON.parse(savedState));
    }
  }
}
