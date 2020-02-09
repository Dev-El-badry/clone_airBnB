import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  ActionSheetController
} from "@ionic/angular";
import { CreateBookingComponent } from '../../../booking/create-booking/create-booking.component';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../place.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offert-detial',
  templateUrl: './offert-detial.page.html',
  styleUrls: ['./offert-detial.page.scss'],
})
export class OffertDetialPage implements OnInit {
  place: Place;
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private route: ActivatedRoute, private placeService:PlaceService, private actionSheetCtrl: ActionSheetController ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack("/places/tabs/offers");
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
    })
  }

  goBook() {
    this.actionSheetCtrl.create({
      header: 'Choose An Action',
      buttons: [
        {
          text: 'Selected Date',
          handler: () => {
            this.onOpneBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.onOpneBookingModal("random");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl=> {
      actionSheetEl.present();
    });
  }

  onOpneBookingModal(mode : 'select' | 'random') {
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
      console.log(modalDismiss.data, modalDismiss.role);
      if (modalDismiss.role === "confirm") {
        console.log("Booked");
      }
    });
  }

}
