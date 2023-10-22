// src/app/components/consultant/list/list.component.ts

import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../../../services/consultant.service';
import { Consultant } from '../../../models/consultant.model';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public consultants: Consultant[] = [];

  displayedColumns: string[] = ['consultantId', 'name', 'specialty', 'actions'];
  dataSource: Consultant[] = [];

  constructor(private consultantService: ConsultantService) { }

  ngOnInit(): void {
    this.loadConsultants();
  }

  private loadConsultants(): void {
    this.consultantService.getConsultants().subscribe(
      data => this.consultants = data,
      error => console.error(error)
    );
  }
}
