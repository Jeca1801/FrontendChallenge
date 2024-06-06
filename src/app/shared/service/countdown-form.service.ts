import { Injectable } from '@angular/core'
import {BehaviorSubject, Observable} from "rxjs";
import {CountdownFormModel} from "../model/countdown-form.model";

@Injectable({
  providedIn: 'root',
})
export class CountdownFormService {
  private formState: BehaviorSubject<CountdownFormModel | null> = new BehaviorSubject<CountdownFormModel | null>({
    title: 'Time to Midsummer  Eve',
    date: new Date(2024, 5, 21),
  })
  formState$: Observable<CountdownFormModel | null> = this.formState.asObservable()

  setFormState(formState: CountdownFormModel): void {
    this.formState.next(formState)
    localStorage.setItem('formState', JSON.stringify(formState))
  }

  getFormState(): void {
    const savedState: string | null = localStorage.getItem('formState')
    if (savedState) {
      this.formState.next(JSON.parse(savedState))
    }
  }
}
