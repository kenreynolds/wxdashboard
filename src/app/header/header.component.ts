import { Component, OnInit } from '@angular/core';
import {
  faAngleDown,
  faBell,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  faAngleDown = faAngleDown;
  faBell = faBell;
  faSearch = faSearch;

  constructor() { }

  ngOnInit() {
  }
}
