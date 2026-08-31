import { Component, OnDestroy, signal } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { interval, fromEvent, Subscription, of, from } from 'rxjs';
import { map, filter, take, debounceTime, distinctUntilChanged, concatMap, delay, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rxjs-example',
  imports: [HeaderMenu, FormsModule],
  templateUrl: './rxjs-example.html',
  styleUrl: './rxjs-example.scss',
})
export class RxjsExample implements OnDestroy {
  // Example 1: map operator
  mapNumbers = signal<number[]>([]);
  mapActive = signal(false);
  private mapSubscription?: Subscription;

  // Example 2: filter operator
  filterNumbers = signal<number[]>([]);
  filterActive = signal(false);
  private filterSubscription?: Subscription;

  // Example 3: combined operators
  combinedResults = signal<string[]>([]);
  combinedActive = signal(false);
  private combinedSubscription?: Subscription;

  // Example 4: search with debounce
  searchTerm = signal('');
  searchResults = signal<string[]>([]);
  private searchSubscription?: Subscription;

  // Example 5: Messages over time (like Observer example but with RxJS pipe)
  pipeMessages = signal<string[]>([]);
  pipeActive = signal(false);
  private pipeSubscription?: Subscription;

  private readonly sampleData = [
    'Angular', 'React', 'Vue', 'Svelte',
    'RxJS', 'Redux', 'NgRx', 'TypeScript',
    'JavaScript', 'Node.js', 'Express', 'NestJS'
  ];

  // Example 1: Map operator - transforms each value
  startMapExample() {
    if (this.mapActive()) return;
    
    this.mapNumbers.set([]);
    this.mapActive.set(true);

    // Create an observable that emits numbers 1-5
    this.mapSubscription = interval(800)
      .pipe(
        take(5),
        // map transforms each value - multiply by 10
        map(x => (x + 1) * 10)
      )
      .subscribe({
        next: (value) => {
          this.mapNumbers.update(nums => [...nums, value]);
        },
        complete: () => {
          this.mapActive.set(false);
        }
      });
  }

  // Example 2: Filter operator - only emits values that pass a condition
  startFilterExample() {
    if (this.filterActive()) return;
    
    this.filterNumbers.set([]);
    this.filterActive.set(true);

    // Create an observable that emits numbers 1-10
    this.filterSubscription = interval(600)
      .pipe(
        take(10),
        map(x => x + 1),
        // filter only keeps even numbers
        filter(x => x % 2 === 0)
      )
      .subscribe({
        next: (value) => {
          this.filterNumbers.update(nums => [...nums, value]);
        },
        complete: () => {
          this.filterActive.set(false);
        }
      });
  }

  // Example 3: Combined operators - chain multiple operators
  startCombinedExample() {
    if (this.combinedActive()) return;
    
    this.combinedResults.set([]);
    this.combinedActive.set(true);

    // Combine multiple operators
    this.combinedSubscription = interval(700)
      .pipe(
        take(8),
        map(x => x + 1),              // Transform to 1, 2, 3...
        filter(x => x % 2 !== 0),     // Only odd numbers: 1, 3, 5, 7
        map(x => x * x),              // Square them: 1, 9, 25, 49
        map(x => `Result: ${x}`)      // Format as string
      )
      .subscribe({
        next: (value) => {
          this.combinedResults.update(results => [...results, value]);
        },
        complete: () => {
          this.combinedActive.set(false);
        }
      });
  }

  // Example 4: Search with debounce - practical example
  setupSearch(inputElement: HTMLInputElement) {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.searchSubscription = fromEvent<InputEvent>(inputElement, 'input')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        debounceTime(500),              // Wait 500ms after typing stops
        distinctUntilChanged(),         // Only if value changed
        map(term => term.toLowerCase())
      )
      .subscribe(searchTerm => {
        if (searchTerm.trim() === '') {
          this.searchResults.set([]);
        } else {
          // Filter data based on search term
          const results = this.sampleData.filter(item => 
            item.toLowerCase().includes(searchTerm)
          );
          this.searchResults.set(results);
        }
      });
  }

  stopMapExample() {
    this.mapSubscription?.unsubscribe();
    this.mapActive.set(false);
  }

  stopFilterExample() {
    this.filterSubscription?.unsubscribe();
    this.filterActive.set(false);
  }

  stopCombinedExample() {
    this.combinedSubscription?.unsubscribe();
    this.combinedActive.set(false);
  }

  // Example 5: Messages over time using RxJS pipe (same as Observer example)
  startPipeExample() {
    if (this.pipeActive()) return;
    
    this.pipeMessages.set([]);
    this.pipeActive.set(true);

    const messages = [
      'Hello from RxJS pipe!',
      'Observables emit data over time...',
      'You can subscribe to receive updates',
      'Multiple subscribers can listen',
      'Remember to unsubscribe!'
    ];

    // Using RxJS operators to emit messages over time
    this.pipeSubscription = from(messages)
      .pipe(
        concatMap((message, index) => 
          of(message).pipe(delay(2000)) // 2 second delay between each message
        ),
        tap(message => {
          this.pipeMessages.update(msgs => [...msgs, message]);
        })
      )
      .subscribe({
        complete: () => {
          this.pipeMessages.update(msgs => [...msgs, '✓ Stream completed']);
          this.pipeActive.set(false);
        }
      });
  }

  stopPipeExample() {
    this.pipeSubscription?.unsubscribe();
    this.pipeActive.set(false);
  }

  resetAll() {
    this.stopMapExample();
    this.stopFilterExample();
    this.stopCombinedExample();
    this.stopPipeExample();
    this.mapNumbers.set([]);
    this.filterNumbers.set([]);
    this.combinedResults.set([]);
    this.searchResults.set([]);
    this.searchTerm.set('');
    this.pipeMessages.set([]);
  }

  ngOnDestroy() {
    this.mapSubscription?.unsubscribe();
    this.filterSubscription?.unsubscribe();
    this.combinedSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.pipeSubscription?.unsubscribe();
  }
}




// EXAMPLES

// Promise

// async getUsers(term: string): Promise<any[]> {
//   const res = await fetch(`/api/users?q=${encodeURIComponent(term)}`);
//   if (!res.ok) throw new Error('Request failed');
//   return res.json();
// }

// Observable

// getUsers(term: string): Observable<any[]> {
//   return this.http
//     .get<any[]>(`/api/users?q=${encodeURIComponent(term)}`)
//     .pipe(
//       map(users => users ?? []),
//       catchError(() => throwError(() => new Error('Request failed')))
//     );
// }

// Combine Api calls

// getUsersWithRoles(term: string): Observable<any[]> {
//   return forkJoin({
//     users: this.getUsers(term),
//     roles: this.http.get<any[]>('/api/roles')
//   }).pipe(
//     map(({ users, roles }) =>
//       users.map(user => ({
//         ...user,
//         role: roles.find(r => r.id === user.roleId) ?? null
//       }))
//     )
//   );
// }

// Make the call

// this.userService.getUsersWithRoles(term).subscribe({
//   next: data => {
//     this.usersWithRoles = data;
//     this.loading = false;
//   },
//   error: err => {
//     this.error = err.message ?? 'Something went wrong';
//     this.loading = false;
//   }
// });


// PIPE

// Before you return this data do the following to it. like an ETL

// map → transform values
// filter → keep some values
// tap → side effects (logging, debug)
// catchError → recover from errors
// switchMap → call another Observable based on previous result