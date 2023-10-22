import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarToggleSubject = new BehaviorSubject<void>(undefined);
  sidebarToggle$ = this.sidebarToggleSubject.asObservable();

  toggleSidebar(): void {
    this.sidebarToggleSubject.next();
  }
}
