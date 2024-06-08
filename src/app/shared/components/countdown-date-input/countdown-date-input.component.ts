import {Component, EventEmitter, Input, Output} from '@angular/core'
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-countdown-date-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './countdown-date-input.component.html',
})
export class CountdownDateInputComponent {
  @Input({ required: true }) control!: FormControl
  @Input({ required: true }) label!: string
  @Output() changeEvent: EventEmitter<void> = new EventEmitter<void>()

  onChange(): void {
    this.changeEvent.emit()
  }
}
