import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import {CountdownFormComponent} from "./components/countdown-form/countdown-form.component";
import {CountdownInformationComponent} from "./components/countdown-infomation/countdown-information.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownFormComponent, CountdownInformationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
