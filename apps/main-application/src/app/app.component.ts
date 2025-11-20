import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent, CardComponent } from 'ui-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'main-application';

  onPrimaryClick(): void {
    console.log('Primary button clicked!');
  }

  onSecondaryClick(): void {
    console.log('Secondary button clicked!');
  }

  onSuccessClick(): void {
    console.log('Success button clicked!');
  }
}
