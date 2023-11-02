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
  selectedDate: Date = new Date(); // Default to today, but you can set this to null or another date if needed

  newRoomName: string = '';

  constructor(
    private surgeryRoomsService: SurgeryRoomsService
  ) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  addNewRoom() {
    if (this.newRoomName) {
        // Call service method to add a new room
        // After successful addition, refresh the rooms list
    }
}

deleteRoom(roomId: number) {
    // Call service method to delete the room by its ID
    // After successful deletion, refresh the rooms list
}

toggleAvailability(roomId: number, isAvailable: boolean) {
    if (isAvailable) {
        // Call service method to mark room as unavailable
    } else {
        // Call service method to mark room as available
    }
    // After successful toggle, refresh the rooms list
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
    let datesToBlock = Array.isArray(date) ? date : [date]; // If it's a single date, convert it to an array
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
