import { Component } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';

@Component({
  selector: 'app-observer-example',
  imports: [HeaderMenu],
  templateUrl: './observer-example.html',
  styleUrl: './observer-example.scss',
})
export class ObserverExample {}
