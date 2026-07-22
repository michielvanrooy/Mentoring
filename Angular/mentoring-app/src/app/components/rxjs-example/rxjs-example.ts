import { Component, OnDestroy, signal } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { interval, fromEvent, Subscription, of } from 'rxjs';
import { map, filter, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  resetAll() {
    this.stopMapExample();
    this.stopFilterExample();
    this.stopCombinedExample();
    this.mapNumbers.set([]);
    this.filterNumbers.set([]);
    this.combinedResults.set([]);
    this.searchResults.set([]);
    this.searchTerm.set('');
  }

  ngOnDestroy() {
    this.mapSubscription?.unsubscribe();
    this.filterSubscription?.unsubscribe();
    this.combinedSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }
}
