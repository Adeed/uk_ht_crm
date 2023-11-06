// Angular imports
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// Services
import { ConsultantService } from '../../consultants/consultant.service';
import { DoctorService } from '../../doctors/doctor.service';
import { TreatmentService } from '../../treatments/treatment.service';
import { PatientService } from '../../patients/patient.service';
import { AppointmentService } from '../appointment.service';

// Models
import { Consultant } from '../../../models/consultant.model';
import { Doctor } from '../../../models/doctor.model';
import { Patient } from '../../../models/patient.model';
import { Treatment } from '../../../models/treatment.model';
import { SurgeryRoom } from '../../../models/surgery_room.model';
import { PatientTreatment } from '../../../models/patient_treatment.model';

@Component({
    selector: 'app-appointment-creation-dialog',
    templateUrl: './appointment-creation-dialog.component.html',
    styleUrls: ['./appointment-creation-dialog.component.scss']
})
export class AppointmentCreationDialogComponent implements OnInit {

    appointmentForm: FormGroup;

    rooms: SurgeryRoom[] = [];
    availableRoomsForDay: any = this.rooms;

    // Add a new property to store the number of booked appointments
    bookedAppointmentsCount: number = 0;
    selectedPatientTreatments: PatientTreatment[] = [];

    consultants: Consultant[] = [];  // Add these arrays
    doctors: Doctor[] = [];
    patients: Patient[] = [];
    treatments: Treatment[] = [];
    SurgeryRoom: Treatment[] = [];

    getDefaultTime(): string {
        const date = new Date();
        date.setHours(10);  // Default to 10 AM
        date.setMinutes(0);
        return date.toISOString().slice(11, 16);  // Return only the time part
    }
    dateFilter = (date: Date | null): boolean => {
        if (!date) { return false; }
        const day = date.getDay();
        // Only allow Monday to Friday
        if (day >= 1 && day <= 5) { return true; } else { return false; }
    }



    constructor(
        private consultantService: ConsultantService,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private treatmentService: TreatmentService,
        private appointmentService: AppointmentService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AppointmentCreationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { date: string, rooms: any[] }
    ) {
        this.rooms = data.rooms;
        this.appointmentForm = this.fb.group({
            appointment_date: ['', Validators.required],
            appointment_notes: [''],
            room_id: ['', Validators.required],
            consultant_id: ['', Validators.required],
            doctor_id: ['', Validators.required],
            patient_id: ['', Validators.required],
            patient_treatment_id: ['', Validators.required],
            appointment_time: [this.getDefaultTime(), Validators.required],
            appointment_status: ['Scheduled', Validators.required]
        });

        const appointmentDateControl = this.appointmentForm.get('appointment_date');
        if (appointmentDateControl) {
            appointmentDateControl.valueChanges.subscribe(date => {
                this.updateAvailableSlotsForDay(date);
            });
        }


    }

    onSubmit() {
        if (this.appointmentForm.valid) {
            const appointmentData = this.appointmentForm.value;
            console.log("Sending to server:", appointmentData);

            this.appointmentService.createAppointment(appointmentData).subscribe(
                response => {
                    console.log("Appointment created successfully!", response);
                    this.dialogRef.close(appointmentData);
                },
                error => {
                    console.error("Error creating appointment:", error);
                }
            );
        } else {
            console.warn("Form is not valid");
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.fetchConsultants();
        this.fetchDoctors();
        this.fetchPatients();
        this.fetchTreatments();
    }

    private fetchConsultants(): void {
        this.consultantService.getConsultants().subscribe(consultants => {
            this.consultants = consultants;
        });
    }
    private fetchDoctors(): void {
        this.doctorService.getDoctors().subscribe(doctors => {
            this.doctors = doctors;
        });
    }
    private fetchPatients(): void {
        this.patientService.getPatients().subscribe(patients => {
            this.patients = patients;
        });
    }
    private fetchTreatments(): void {
        this.treatmentService.getTreatments().subscribe(treatments => {
            this.treatments = treatments;
        });
    }

    // Update the `updateAvailableSlotsForDay` method
    updateAvailableSlotsForDay(date: Date) {
        console.log('Updating slots for date:', date);

        const formattedDate = date.toISOString().split('T')[0];
        this.appointmentService.getAvailableRoomsForDate(formattedDate).subscribe(response => {
            console.log('Available Rooms:', response);

            // Map the room_ids from the response to their corresponding room names
            this.availableRoomsForDay = response.map((room: any) => {
                const fullRoomInfo = this.rooms.find(r => r.room_id === room.room_id);
                return {
                    room_id: room.room_id,
                    room_name: fullRoomInfo ? fullRoomInfo.room_name : 'Unknown Room'
                };
            });
        });
    }
    onPatientSelected() {
        const selectedPatientId = this.appointmentForm?.get('patient_id')?.value;
        if (selectedPatientId) {
            this.patientService.getTreatmentsForPatient(selectedPatientId).subscribe(treatments => {
                this.selectedPatientTreatments = treatments;
            });
        }
    }

}
