import {Component, EventEmitter, Input, Output} from '@angular/core'
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-countdown-title-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './countdown-title-input.component.html',
  styleUrl: 'countdown-title-input.component.scss'
})
export class CountdownTitleInputComponent {
  @Input({ required: true }) control!: FormControl
  @Input({ required: true }) label!: string
  @Output() changeEvent: EventEmitter<void> = new EventEmitter<void>()

  onBlur(): void {
    this.changeEvent.emit()
  }
}
