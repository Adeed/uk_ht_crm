import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';  // Adjust the path as needed
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;  // Reference to the sidebar element

  private sidebarSubscription: Subscription = new Subscription();

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    // Subscribe to sidebar toggle events
    this.sidebarSubscription = this.sidebarService.sidebarToggle$.subscribe(
      () => {
        if (this.sidenav) {
          this.sidenav.toggle();
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  // Define the pages for the sidebar
  pages = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Patient Details', link: '/patients' },
    { title: 'Doctor Details', link: '/doctors' },
    { title: 'Consultant Details', link: '/consultants' },
    { title: 'Appointments', link: '/appointments' },
    { title: 'Treaments', link: '/treatments' },
    { title: 'Payments', link: '/payments' },
    { title: 'User Details', link: '/users' }
    // ... other pages
  ];
}
