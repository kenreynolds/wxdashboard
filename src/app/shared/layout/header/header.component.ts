import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  trigger,
  transition
} from '@angular/animations';
import {
  faAngleDown,
  faBell,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  /* animations: [
    trigger('toggleMenu', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-345px)'
        }),
        animate('0.333s ease-in')
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateY(-345px)',
          opacity: 0
        }))
      ])
    ])
  ] */
})
export class HeaderComponent implements OnInit {
  faAngleDown = faAngleDown;
  faBell = faBell;
  faSearch = faSearch;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleUserProfileMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
