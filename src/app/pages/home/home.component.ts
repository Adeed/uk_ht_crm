import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  patients: Patient[] = [];

  messages: string[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadMessages();
    this.loadPatients();

  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      data => this.patients = data,
      error => console.error(error)
    );
  }
  
  loadMessages(): void {
    // For example, assume you have a service to fetch messages
    // this.messageService.getMessages().subscribe(
    //   data => this.messages = data,
    //   error => console.error(error)
    // );
  }
}
