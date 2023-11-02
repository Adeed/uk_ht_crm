// src/app/modules/dashboard/sidenav/sidenav.component.ts

import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  dashboardRoutes:Routes = [];

  constructor(private router: Router) {
    const route = this.router.config.find(r => r.path === 'dashboard');
    if (route && route.children) {
      this.dashboardRoutes = route.children;
    }
  }
}
