import { Component } from '@angular/core'
import {CountdownFormService} from "../../shared/service/countdown-form.service";
import {Observable} from "rxjs";
import {CountdownFormModel} from "../../shared/model/countdown-form.model";
import {CommonModule} from "@angular/common";
import {ContainTextComponent} from "../../shared/components/contain-text/contain-text.component";

@Component({
  selector: 'app-countdown-information',
  standalone: true,
  imports: [CommonModule, ContainTextComponent],
  templateUrl: './app-countdown-information.component.html',
})
export class CountdownInformationComponent {
  public formState$: Observable<CountdownFormModel | null> = this.countdownFormService.formState$

  constructor(private countdownFormService: CountdownFormService) {}

  ngOnInit() {
    this.countdownFormService.getFormState()
  }
}
