import { Component, OnDestroy, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderMenu } from '../header-menu/header-menu';

@Component({
  selector: 'app-observer-example',
  imports: [HeaderMenu],
  templateUrl: './observer-example.html',
  styleUrl: './observer-example.scss',
})
export class ObserverExample implements OnDestroy {
  messages = signal<string[]>([]);
  isSubscribed = signal(false);
  private subscription: any = null;
  private messageObservable$: Observable<string>;

  constructor() {
    this.messageObservable$ = new Observable<string>((observer) => {
      let count = 0;
      const messages = [
        'Hello from Observable!',
        'Observables emit data over time...',
        'You can subscribe to receive updates',
        'Multiple subscribers can listen',
        'Remember to unsubscribe!'
      ];

      const interval = setInterval(() => {
        if (count < messages.length) {
          observer.next(messages[count]);
          count++;
        } else {
          observer.complete();
          clearInterval(interval);
        }
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    });
  }

  subscribe() {
    if (this.subscription) {
      return;
    }

    this.messages.set([]);
    this.isSubscribed.set(true);

    this.subscription = this.messageObservable$.subscribe({
      next: (message) => {
        this.messages.update(msgs => [...msgs, message]);
      },
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => {
        this.messages.update(msgs => [...msgs, '✓ Stream completed']);
        this.isSubscribed.set(false);
        this.subscription = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
