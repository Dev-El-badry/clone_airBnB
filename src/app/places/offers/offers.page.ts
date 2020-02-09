import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import {IonItemSliding} from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadPlaces: Place[];
  constructor(private palceService: PlaceService, private router: Router) { }

  ngOnInit() {
    this.loadPlaces = this.palceService.Places;
  }

  onEdit(placeId: string, sliding: IonItemSliding) {
    sliding.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', placeId]);
    console.log("Editing Item", placeId);
  }

}
