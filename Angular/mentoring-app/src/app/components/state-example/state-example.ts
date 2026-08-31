import { Component } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { StateDisplay } from '../state-display/state-display';
import { StateInput } from '../state-input/state-input';

@Component({
  selector: 'app-state-example',
  imports: [HeaderMenu, StateDisplay, StateInput],
  templateUrl: './state-example.html',
  styleUrl: './state-example.scss',
})
export class StateExample {

}
