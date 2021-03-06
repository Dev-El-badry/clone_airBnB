import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: "app-create-booking",
  templateUrl: "./create-booking.component.html",
  styleUrls: ["./create-booking.component.scss"]
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', {static: false}) form: NgForm;
  startDate: string;
  endDate: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableTo = this.selectedPlace.availableTo;
    const availableFrom = this.selectedPlace.availableFrom;
    if(this.selectedMode == 'random') {
      this.startDate = new Date(
        availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
      ).toISOString();
      this.endDate = new Date(
        new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())
        ).toISOString();
    }
  }
  closeModal() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  onBooking(form: NgForm) {
    if (!form.valid || !this.datesValid()) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingDate: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: this.form.value['guest-number'],
          dateFrom: new Date(this.form.value['date-from']),
          dateTo: new Date(this.form.value['date-to'])
        }
        
      },
      'confirm'
    );
  }

  datesValid() {
    
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;
  }
}
