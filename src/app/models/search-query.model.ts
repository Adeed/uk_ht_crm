export class SearchQuery {
    searchTerm: string = '';
    type: string = '';
  
    constructor(searchTerm: string = '', type: string = '') {
      this.searchTerm = searchTerm;
      this.type = type;
    }
  }
  