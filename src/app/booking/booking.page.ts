import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"]
})
export class BookingPage implements OnInit, OnDestroy {
  bookings: Booking[];
  bookingSub: Subscription;
  isLoading: boolean;
  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.bookingSub = this.bookingService.Bookings.subscribe(bookings => {
      this.bookings = bookings;
      
    });
  }

  ionViewWillEnter() {
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCancel(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl.create({
      message: 'Canceling ...'
    })
    .then((loadingEl) => {
      loadingEl.present();
      this.bookingSub = this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl("/booking");
      });
    })
  }

  ngOnDestroy() {
    if(this.bookingSub) this.bookingSub.unsubscribe();
  }
}
