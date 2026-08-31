import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-non-state-display',
  imports: [],
  templateUrl: './non-state-display.html',
  styleUrl: './non-state-display.scss',
})
export class NonStateDisplay {
  @Input() message = '';
}
