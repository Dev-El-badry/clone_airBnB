import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { CreateBookingComponent } from "../../../booking/create-booking/create-booking.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PlaceService } from "../../place.service";
import { Place } from "../../place.model";
import { Subscription } from "rxjs";
import { BookingService } from "src/app/booking/booking.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-offert-detial",
  templateUrl: "./offert-detial.page.html",
  styleUrls: ["./offert-detial.page.scss"]
})
export class OffertDetialPage implements OnInit, OnDestroy {
  place: Place;
  placeSub: Subscription;
  isBooking: boolean = false;
  isLoading: boolean;
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private placeServie: PlaceService,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router

  ) {}

  ngOnInit() {
    
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
      }
      this.placeSub = this.placeServie.getPlace(paramMap.get("placeId")).subscribe(place => {
        this.place = place;
        this.isBooking = place.userID !== this.authService.userID;
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create(
          {
            header: 'Error An Occurred',
            message: 'place could not fetched! please try again later!',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/places/tabs/discover']);
                }
              }
            ]
          }
        ).then(alertEl => alertEl.present())
      });
    });
  }

  goBook() {
    this.actionSheetCtrl
      .create({
        header: "Choose An Action",
        buttons: [
          {
            text: "Selected Date",
            handler: () => {
              this.onOpneBookingModal("select");
            }
          },
          {
            text: "Random Date",
            handler: () => {
              this.onOpneBookingModal("random");
            }
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  onOpneBookingModal(mode: "select" | "random") {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modalCreate => {
        modalCreate.present();
        return modalCreate.onDidDismiss();
      })
      .then(modalDismiss => {
        console.log(modalDismiss);
        if (modalDismiss.role === "confirm") {
          const data = modalDismiss.data.bookingDate;
          this.makeBooking(data);
         
        }
      });
  }

  makeBooking(data) {
    this.loadingCtrl.create({
      message: 'adding new palce...'
    }).then((loadingEl) => {
      loadingEl.present();
      this.bookingService.addBooking(
        Math.random().toString(),
        this.place.id,
        this.authService.userID,
        this.place.title,
        data.guestNumber,
        data.firstName,
        data.lastName,
        data.dateTo,
        data.dateFrom
      ).subscribe(() => {
       this.loadingCtrl.dismiss();
      });
    })
  }

  cancelBooking() {}

  ngOnDestroy() {
    if (this.placeSub) this.placeSub.unsubscribe();
  }
}
