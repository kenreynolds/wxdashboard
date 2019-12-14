import { Component, OnInit } from '@angular/core';
import {
  faChartLine,
  faEnvelope,
  faHome
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  faChartLine = faChartLine;
  faEnvelope = faEnvelope;
  faHome = faHome;

  constructor() { }

  ngOnInit() {
  }
}
