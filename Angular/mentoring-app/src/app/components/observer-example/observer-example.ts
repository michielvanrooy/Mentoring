import { Component, OnInit, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { HeaderMenu } from '../header-menu/header-menu';

@Component({
  selector: 'app-observer-example',
  imports: [HeaderMenu, ReactiveFormsModule],
  templateUrl: './observer-example.html',
  styleUrl: './observer-example.scss',
})
export class ObserverExample implements OnInit, OnDestroy {
  messages = signal<string[]>([]);
  isSubscribed = signal(false);
  private subscription: any = null;
  private messageObservable$!: Observable<string>;

  // Text input observable
  textControl = new FormControl('');
  textChanges = signal<string[]>([]);

  ngOnInit() {
    // Setup message observable
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


    //Text box
    this.textControl.valueChanges
      .pipe(
        tap(value => {
          this.textChanges.update(changes => [
          ...changes, 
          `Text changed: "${value}" (length: ${value!.length})`
          ]);
        }),
      )
      .subscribe();
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

  clearTextChanges() {
    this.textChanges.set([]);
    this.textControl.setValue('');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
