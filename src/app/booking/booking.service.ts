import {Injectable} from '@angular/core';
import {Booking} from './booking.model';
@Injectable({
  providedIn: "root"
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: "b1",
      placeId: "p1",
      userId: "u1",
      placeTitle: "Manhattan Mansion",
      guestNumber: 5
  
    }
  ];
  constructor() {
    
  }

    get Bookings() {
      return [...this._bookings];
    }
}