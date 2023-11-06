import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { ConsultantService } from '../../consultants/consultant.service';
import { DoctorService } from '../../doctors/doctor.service';
import { TreatmentService } from '../../treatments/treatment.service';
import { PatientService } from '../../patients/patient.service';
import { AppointmentService } from '../appointment.service';

import { PatientTreatment } from '../../../models/patient_treatment.model';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentDetailDialogComponent } from '../appointment-detail-dialog/appointment-detail-dialog.component';
import { AppointmentCreationDialogComponent } from '../appointment-creation-dialog/appointment-creation-dialog.component';

@Component({
  selector: 'app-appointment-scheduler',
  templateUrl: './appointment-scheduler.component.html',
  styleUrls: ['./appointment-scheduler.component.scss']
})
export class AppointmentSchedulerComponent implements OnInit {
  public calendarOptions: any;
  calendarInitialized: boolean = false;

  rooms: any[] = [];

  appointments: Appointment[] = [];
  consultants: any[] = [];
  doctors: any[] = [];
  patients: any[] = [];
  patientTreatments: PatientTreatment[] = [];
  treatments: any[] = [];
  calendarEvents: any[] = [];
  eventsModel: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private consultantService: ConsultantService,
    private doctorService: DoctorService,
    private treatmentService: TreatmentService,
    private patientService: PatientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.initCalendarOptions();


  }

  private loadInitialData(): void {
    forkJoin({
      consultants: this.consultantService.getConsultants(),
      doctors: this.doctorService.getDoctors(),
      patients: this.patientService.getPatients(),
      appointments: this.appointmentService.getAppointments(),
      rooms: this.appointmentService.getSurgeryRooms(),
      allPatientTreatments: this.patientService.getAllPatientTreatments()
    }).subscribe(result => {
      this.consultants = result.consultants;
      this.doctors = result.doctors;
      this.patients = result.patients;
      this.appointments = result.appointments;
      this.rooms = result.rooms;

      this.patientTreatments = result.allPatientTreatments.map(pt => {
        const treatmentsArray = pt.treatments.split('|');
        return {
          patient_treatment_id: parseInt(treatmentsArray[0]),
          patient_id: pt.patient_id,
          treatment_name: treatmentsArray[1],
          no_of_grafts: parseInt(treatmentsArray[2]),
          area_of_transplant: treatmentsArray[3],
          sessions_agreed: parseInt(treatmentsArray[4]),
          final_cost: parseFloat(treatmentsArray[5])
        };
      });

      this.updateCalendarEvents();
      this.initCalendarOptions();
    });
  }


  private initCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'listMonth',
      selectable: true,
      views: {
        dayGrid: {
          // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
        },
        timeGrid: {
          // options apply to timeGridWeek and timeGridDay views
        },
        week: {
          // options apply to dayGridWeek and timeGridWeek views
        },
        day: {
          // options apply to dayGridDay and timeGridDay views
        }
      },
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listMonth'
      },
      events: this.calendarEvents,  // Assign the events here
      editable: false,
      dateClick: this.handleDateClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
      eventResize: this.handleEventResize.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };

    this.calendarInitialized = true;

  }
  private updateCalendarEvents(): void {
    if (this.appointments && this.consultants && this.doctors && this.patientTreatments && this.patients) {
      this.calendarEvents = this.appointments.map(appointment => {
        const startDate = new Date(appointment.appointment_date);
        startDate.setHours(parseInt(appointment.appointment_time.split(':')[0]), parseInt(appointment.appointment_time.split(':')[1]));

        const patient = this.patients.find(p => p.patient_id === appointment.patient_id);
        const treatment = this.patientTreatments.find(t => t.patient_treatment_id === appointment.patient_treatment_id);
        const title = `${patient?.first_name} ${patient?.last_name} 
                      | Ethnicity: ${patient.ethnicity} 
                      | City From: ${patient.city} 
                      | Treatment:${treatment?.treatment_name}
                      | Area Of Transplant: ${treatment?.area_of_transplant}
                      | No Of Grafts: ${treatment?.no_of_grafts}
                      | Agreed Sessions: ${treatment?.sessions_agreed}
                      | Agreed Price: ${treatment?.final_cost}
                      | Notes: ${appointment.appointment_notes}`;

        let backgroundColor = 'blue';  // default color
        if (treatment?.treatment_name === 'PRP') {
          backgroundColor = 'green';
        } else if (treatment?.treatment_name === 'G-FN') {
          backgroundColor = 'red';
        } else if (treatment?.treatment_name === 'BLT') {
          backgroundColor = 'purple';
        }
        const event = {
          title: title,
          start: startDate.toISOString(),
          allDay: false,
          backgroundColor: backgroundColor,
          extendedProps: {
            appointment
          }
        };
        return event;
      });
    }
  }

  handleDateClick(arg: any) {
    const dialogRef = this.dialog.open(AppointmentCreationDialogComponent, {
      data: { date: arg.dateStr, rooms: this.rooms }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new event to the calendar's events array
        this.calendarEvents.push({
          title: `${result.treatment} for ${result.patientName}`,
          date: arg.dateStr,
          editable: true
        });
      }
    });
  }

  handleEventDrop(arg: any) {
    alert('Appointment dropped on: ' + arg.dateStr);
    // Here, you can update the event's date in your backend or perform other necessary actions
  }
  handleEventResize(arg: any) {
    alert('Appointment resized to: ' + arg.endStr);
    // Update the event's end date/time in your backend or perform other necessary actions
  }
  handleEventClick({ event }: any): void {
    const appointmentData = event.extendedProps.appointment;

    // Cross-reference the fetched data for detailed information
    const consultant = this.consultants.find(c => c.consultant_id === appointmentData.consultant_id);
    const doctor = this.doctors.find(d => d.doctor_id === appointmentData.doctor_id);
    const patient = this.patients.find(p => p.patient_id === appointmentData.patient_id);
    const treatment = this.treatments.find(t => t.treatment_id === appointmentData.treatment_id);
    const appointment = this.appointments.find(a => a.appointment_id === appointmentData.appointment_id);

    // Display the information in a dialog
    // For this, you'll need to create a separate dialog component that shows the detailed information.
    const dialogRef = this.dialog.open(AppointmentDetailDialogComponent, {
      data: {
        consultant,
        doctor,
        patient,
        treatment,
        appointment
      }
    });
  }

}
