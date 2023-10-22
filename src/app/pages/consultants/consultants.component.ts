import { Component } from '@angular/core';

import { SearchQuery } from '../../models/search-query.model';
import { ConsultantService } from '../../services/consultant.service';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss']
})
export class ConsultantsComponent {

  constructor(private consultantService: ConsultantService) { }

  onSearch(searchQuery: SearchQuery): void {
    // Implement the search logic here, e.g., call a service method
    this.consultantService.searchConsultants(searchQuery).subscribe(/* ... */);
  }
}
