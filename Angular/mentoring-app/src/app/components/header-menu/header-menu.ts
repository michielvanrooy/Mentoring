import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})
export class HeaderMenu {}
