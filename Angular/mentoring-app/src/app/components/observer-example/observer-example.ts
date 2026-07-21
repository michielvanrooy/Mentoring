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
  private messageObservable: Observable<string>;

  constructor() {
    // Create an Observable that emits messages over time
    // This is what an Observable IS - a stream of data over time
    this.messageObservable = new Observable<string>((observer) => {
      let count = 0;
      const messages = [
        'Hello from Observable!',
        'Observables emit data over time...',
        'You can subscribe to receive updates',
        'Multiple subscribers can listen',
        'Remember to unsubscribe!'
      ];

      // Emit messages every 2 seconds
      const interval = setInterval(() => {
        if (count < messages.length) {
          observer.next(messages[count]);
          count++;
        } else {
          observer.complete();
          clearInterval(interval);
        }
      }, 2000);

      // Cleanup function - runs when unsubscribed
      return () => {
        clearInterval(interval);
        console.log('Observable cleaned up');
      };
    });
  }

  subscribe() {
    if (this.subscription) {
      return; // Already subscribed
    }

    this.messages.set([]);
    this.isSubscribed.set(true);

    // Subscribe to the Observable
    this.subscription = this.messageObservable.subscribe({
      next: (message) => {
        // Called each time the Observable emits
        console.log('Received:', message);
        this.messages.update(msgs => [...msgs, message]);
      },
      error: (err) => {
        // Called if an error occurs
        console.error('Error:', err);
      },
      complete: () => {
        // Called when the Observable completes
        console.log('Observable completed');
        this.messages.update(msgs => [...msgs, '✓ Stream completed']);
        this.isSubscribed.set(false);
        this.subscription = null;
      }
    });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
      this.isSubscribed.set(false);
      this.messages.update(msgs => [...msgs, '✗ Unsubscribed']);
    }
  }

  reset() {
    this.unsubscribe();
    this.messages.set([]);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
