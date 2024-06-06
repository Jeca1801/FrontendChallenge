import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import {CountdownFormComponent} from "./components/countdown-form/countdown-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
