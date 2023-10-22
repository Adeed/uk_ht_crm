// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  title = 'crm_app';

  constructor(private sidebarService: SidebarService) {}

  ngAfterViewInit(): void {
    this.sidebarService.sidebarToggle$.subscribe(() => {
      this.sidenav.toggle();
    });
  }
}
