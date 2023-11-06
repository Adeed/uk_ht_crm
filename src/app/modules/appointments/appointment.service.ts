import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { Consultant } from '../../models/consultant.model';
import { Doctor } from '../../models/doctor.model';
import { Patient } from '../../models/patient.model';
import { Treatment } from '../../models/treatment.model';
import { PatientTreatment } from '../../models/patient_treatment.model';
import { SurgeryRoom } from '../../models/surgery_room.model';

import { ConsultantService } from '../consultants/consultant.service'
import { DoctorService } from '../doctors/doctor.service'
import { PatientService } from '../patients/patient.service'
import { TreatmentService } from '../treatments/treatment.service'

import { Appointment } from 'src/app/models/appointment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = `${environment.apiUrl}/appointments`;

  constructor(
    private consultantService: ConsultantService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private treatmentService: TreatmentService,
    private http: HttpClient
  ) { }

  createAppointment(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getPatientTreatments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient-treatments`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}`);
  }

  getProcessedAppointments(): Observable<any[]> {
    return forkJoin({
      appointments: this.getAppointments(),
      consultants: this.consultantService.getConsultants(),
      doctors: this.doctorService.getDoctors(),
      patients: this.patientService.getPatients(),
      treatments: this.treatmentService.getTreatments(),
      patientTreatments: this.getPatientTreatments()
    }).pipe(
      map(data => {
        return data.appointments.map(appointment => {
          const doctor = data.doctors.find((d: Doctor) => d.doctor_id === appointment.doctor_id);
          const patient = data.patients.find((p: Patient) => p.patient_id === appointment.patient_id);

          // Find the patient treatment based on the appointment's treatment_id
          const patientTreatment = data.patientTreatments.find((pt: PatientTreatment) => pt.patient_treatment_id === appointment.patient_treatment_id);

          // Find the corresponding treatment detail
          const treatment = data.treatments.find((t: Treatment) => t.treatment_id === patientTreatment?.patient_treatment_id);

          return {
            title: `Appointment with ${doctor?.name} for ${patient?.first_name} - ${treatment?.name}`,
            start: new Date(appointment.appointment_date + 'T' + appointment.appointment_time),
            end: new Date(new Date(appointment.appointment_date + 'T' + appointment.appointment_time).getTime() + 1 * 60 * 60 * 1000),
            allDay: false
          };
        });
      })
    );
  }


  //rooms service
  getSurgeryRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/surgery-rooms`);
  }

  // check appointments by date
  getAppointmentsForDate(date: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/count?date=${date}`);
  }

  // get available rooms for the date
  getAvailableRoomsForDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/available-rooms/${date}`);
  }


}
