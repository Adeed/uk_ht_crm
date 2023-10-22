// header.component.ts
import { Component } from '@angular/core';

import { SidebarService } from '../../../services/sidebar.service';  // Adjust the path as needed


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  logout() {
    // logic to handle logout
  }
}


 