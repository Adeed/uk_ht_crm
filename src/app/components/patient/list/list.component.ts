// src/app/components/patient/list/list.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() patients: Patient[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
