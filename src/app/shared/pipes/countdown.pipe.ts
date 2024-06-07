import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import {
  MILLISECONDS_PER_SEC,
  SEC_PER_MIN,
  MIN_PER_HOUR,
  HOUR_PER_DAY,
} from '../constants/time.constants';

@Pipe({
  name: 'countDown',
  standalone: true,
  pure: false,
})
export class CountdownPipe implements PipeTransform, OnDestroy {
  private subscription: Subscription | null = null;
  private value: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  transform(value: Date | string): string {
    if (!value) return '';

    this.startCountdown(value);

    return this.value;
  }

  private startCountdown(value: Date | string): void {
    this.unsubscribeFromPreviousCountdown();

    this.subscription = interval(1000)
      .pipe(map(() => this.calculateCountDown(value)))
      .subscribe(result => {
        this.value = result;
        this.cd.markForCheck();
      });
  }

  private calculateCountDown(dateString: Date | string): string {
    const targetDate: Date = new Date(dateString);
    const now: Date = new Date();
    const timeDifference: number = targetDate.getTime() - now.getTime();

    if (this.isEventToday(targetDate)) return 'The event is today.';
    if (this.isEventTomorrow(targetDate)) return 'The event is tomorrow.';
    if (this.isEventPast(timeDifference)) return 'The event has already passed.';

    return this.formatTimeRemaining(timeDifference);
  }

  private isEventToday(targetDate: Date): boolean {
    return targetDate.getDate() === new Date().getDate();
  }

  private isEventTomorrow(targetDate: Date): boolean {
    return targetDate.getDate() === new Date().getDate() + 1;
  }

  private isEventPast(timeDifference: number): boolean {
    return timeDifference <= 0;
  }

  private formatTimeRemaining(timeDifference: number): string {
    const timeRemaining = this.getTimeRemaining(timeDifference);
    return `${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds`;
  }

  private getTimeRemaining(timeDifference: number): { days: number, hours: number, minutes: number, seconds: number } {
    const seconds: number = Math.floor((timeDifference / MILLISECONDS_PER_SEC) % SEC_PER_MIN);
    const minutes: number = Math.floor((timeDifference / (MILLISECONDS_PER_SEC * SEC_PER_MIN)) % MIN_PER_HOUR);
    const hours: number = Math.floor((timeDifference / (MILLISECONDS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR)) % HOUR_PER_DAY);
    const days: number = Math.floor(timeDifference / (MILLISECONDS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOUR_PER_DAY));

    return { days, hours, minutes, seconds };
  }

  ngOnDestroy() {
    this.unsubscribeFromPreviousCountdown();
  }

  private unsubscribeFromPreviousCountdown(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
