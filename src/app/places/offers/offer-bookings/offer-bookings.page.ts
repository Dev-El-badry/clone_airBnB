import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';
import { PlaceService } from '../../place.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place;
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placeServie: PlaceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack("/places/tabs/offers");
      }
      this.place = this.placeServie.getPlace(paramMap.get('placeId'));
    })
  }

}
