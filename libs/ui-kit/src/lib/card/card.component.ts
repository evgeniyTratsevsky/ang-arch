import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * UI Kit Card Component
 * Контейнер для контента
 */
@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()">
      @if (title()) {
        <div class="card-header">
          <h3>{{ title() }}</h3>
          @if (subtitle()) {
            <p class="subtitle">{{ subtitle() }}</p>
          }
        </div>
      }

      <div class="card-body">
        <ng-content></ng-content>
      </div>

      @if (footer()) {
        <div class="card-footer">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: box-shadow 0.2s ease;

      &.hoverable:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &.clickable {
        cursor: pointer;
      }
    }

    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e0e0e0;

      h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
      }

      .subtitle {
        margin: 0.5rem 0 0 0;
        font-size: 0.875rem;
        color: #666;
      }
    }

    .card-body {
      padding: 1.5rem;
    }

    .card-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e0e0e0;
      background: #fafafa;
    }

    .padding-none {
      .card-body {
        padding: 0;
      }
    }

    .padding-small {
      .card-body {
        padding: 0.75rem;
      }
    }

    .padding-large {
      .card-body {
        padding: 2rem;
      }
    }
  `],
})
export class CardComponent {
  title = input<string>();
  subtitle = input<string>();
  footer = input<boolean>(false);
  hoverable = input<boolean>(false);
  clickable = input<boolean>(false);
  padding = input<'none' | 'small' | 'medium' | 'large'>('medium');

  cardClasses = (): string => {
    const classes = ['card'];
    if (this.hoverable()) classes.push('hoverable');
    if (this.clickable()) classes.push('clickable');
    if (this.padding() !== 'medium') {
      classes.push(`padding-${this.padding()}`);
    }
    return classes.join(' ');
  };
}

