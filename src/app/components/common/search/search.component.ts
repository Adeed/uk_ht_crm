// src/app/components/search/search.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { SearchQuery } from '../../../models/search-query.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery: SearchQuery = new SearchQuery();

  @Output() search = new EventEmitter<SearchQuery>();

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.searchTerm = target.value;
  }
  
}
