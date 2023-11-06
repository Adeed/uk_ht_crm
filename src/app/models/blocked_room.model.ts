export interface BlockedRoom {
    id: number;             // Unique identifier for the blocked room entry
    room_id: number;        // Identifier for the surgery room
    blocked_date: Date;     // The date on which the room is blocked
}
