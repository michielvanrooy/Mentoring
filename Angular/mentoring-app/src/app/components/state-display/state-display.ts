import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ValueState } from '../../stores/value/value.state';

@Component({
  selector: 'app-state-display',
  imports: [],
  templateUrl: './state-display.html',
  styleUrl: './state-display.scss',
})
export class StateDisplay implements OnInit {
  private store = inject(Store);
  protected stateValue: string = '';
  protected stateValue$ = this.store.select(ValueState.value);

  ngOnInit(): void {
    this.stateValue$.subscribe(value => {
      this.stateValue = value;
    });
  }
}
