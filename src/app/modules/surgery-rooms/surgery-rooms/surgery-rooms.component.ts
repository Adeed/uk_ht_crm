import { Component, OnInit } from '@angular/core';
import { SurgeryRoomsService } from '../surgery-rooms.service';

@Component({
  selector: 'app-surgery-rooms',
  templateUrl: './surgery-rooms.component.html',
  styleUrls: ['./surgery-rooms.component.scss']
})
export class SurgeryRoomsComponent implements OnInit {

  rooms: any[] = [];
  blockedDates: { [roomId: number]: Date[] } = {};
  selectedDate: Date = new Date();
  selectedRoom: number | null = null;  // Define selectedRoom property

  newRoomName: string = '';

  constructor(private surgeryRoomsService: SurgeryRoomsService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  addNewRoom() {
    if (this.newRoomName) {
      this.surgeryRoomsService.addNewRoom(this.newRoomName).subscribe(() => {
        this.loadRooms();
      });
    }
  }

  deleteRoom(roomId: number) {
    this.surgeryRoomsService.deleteRoom(roomId).subscribe(() => {
      this.loadRooms();
    });
  }

  toggleAvailability(roomId: number, isAvailable: boolean) {
    const newState = !isAvailable; // Toggle the state
    this.surgeryRoomsService.updateRoomAvailability(roomId, newState).subscribe(() => {
      this.loadRooms();
    });
  }

  loadRooms() {
    this.surgeryRoomsService.getSurgeryRooms().subscribe(rooms => {
      this.rooms = rooms;
      rooms.forEach(room => this.loadBlockedDatesForRoom(room.room_id));
    });
  }

  loadBlockedDatesForRoom(roomId: number) {
    this.surgeryRoomsService.getBlockedDatesForRoom(roomId).subscribe(dates => {
      this.blockedDates[roomId] = dates;
    });
  }

  blockRoom(roomId: number, date: Date | Date[]) {
    let datesToBlock = Array.isArray(date) ? date : [date];
    this.surgeryRoomsService.blockRoomForDates(roomId, datesToBlock).subscribe(() => {
      this.loadBlockedDatesForRoom(roomId);
    });
  }  

  unblockRoom(roomId: number, date: Date) {
    this.surgeryRoomsService.unblockRoomForDate(roomId, date).subscribe(() => {
      this.loadBlockedDatesForRoom(roomId);
    });
  }

}
