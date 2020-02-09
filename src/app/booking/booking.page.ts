import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"]
})
export class BookingPage implements OnInit {
  bookings: Booking[];
  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookings = this.bookingService.Bookings;
    console.log(this.bookings);
  }

  onCancel(bookingId, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Cancel Booking');
  }
}
