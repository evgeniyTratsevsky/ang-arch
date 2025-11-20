import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * UI Kit Button Component
 * Переиспользуемый компонент кнопки
 */
@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <span class="spinner"></span>
      }
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &:not(:disabled):active {
        transform: translateY(0);
      }
    }

    /* Sizes */
    .size-small {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }

    .size-medium {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .size-large {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    /* Variants */
    .variant-primary {
      background: #2196f3;
      color: white;

      &:not(:disabled):hover {
        background: #1976d2;
      }
    }

    .variant-secondary {
      background: #607d8b;
      color: white;

      &:not(:disabled):hover {
        background: #455a64;
      }
    }

    .variant-success {
      background: #4caf50;
      color: white;

      &:not(:disabled):hover {
        background: #388e3c;
      }
    }

    .variant-danger {
      background: #f44336;
      color: white;

      &:not(:disabled):hover {
        background: #d32f2f;
      }
    }

    .variant-warning {
      background: #ff9800;
      color: white;

      &:not(:disabled):hover {
        background: #f57c00;
      }
    }

    /* Full width */
    .full-width {
      width: 100%;
    }

    /* Loading spinner */
    .spinner {
      width: 1em;
      height: 1em;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `],
})
export class ButtonComponent {
  // Inputs
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);

  // Output
  clicked = output<MouseEvent>();

  // Computed classes
  buttonClasses = computed(() => {
    const classes = [];
    classes.push(`variant-${this.variant()}`);
    classes.push(`size-${this.size()}`);
    if (this.fullWidth()) {
      classes.push('full-width');
    }
    return classes.join(' ');
  });

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}

