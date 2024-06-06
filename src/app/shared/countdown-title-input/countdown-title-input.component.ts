import {Component, EventEmitter, Input, Output} from '@angular/core'
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-countdown-title-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './countdown-title-input.component.html',
})
export class CountdownTitleInputComponent {
  @Input({ required: true }) control!: FormControl
  @Input({ required: true }) label!: string
  @Output() blurEvent: EventEmitter<void> = new EventEmitter<void>()

  onBlur(): void {
    this.blurEvent.emit()
  }
}
