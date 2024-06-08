import {Component, OnInit} from '@angular/core'
import {CountdownFormService} from "../../shared/service/countdown-form.service";
import {Observable} from "rxjs";
import {CountdownFormModel} from "../../shared/model/countdown-form.model";
import {CommonModule} from "@angular/common";
import {ContainTextComponent} from "../../shared/components/contain-text/contain-text.component";
import {CountdownPipe} from "../../shared/pipes/countdown.pipe";

@Component({
  selector: 'app-countdown-information',
  standalone: true,
  imports: [CommonModule, ContainTextComponent, CountdownPipe],
  templateUrl: './countdown-information.component.html',
  styleUrl: './countdown-information.component.scss'
})
export class CountdownInformationComponent implements OnInit {
  public formState$: Observable<CountdownFormModel | null> = this.countdownFormService.formState$

  constructor(private countdownFormService: CountdownFormService) {}

  ngOnInit(): void {
    this.countdownFormService.loadInitialFormState()
  }
}
